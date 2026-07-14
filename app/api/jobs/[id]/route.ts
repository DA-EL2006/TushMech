import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { pusherServer } from "@/app/lib/pusher";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const mechanicId = (session.user as any).id;
    const role = (session.user as any).role;

    if (role !== "MECHANIC" && role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Update the job status and assign the mechanic
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        status,
        mechanic_id: status === "ASSIGNED" ? mechanicId : undefined, // Assign mechanic if they accept
      },
      include: {
        mechanic: { select: { first_name: true, last_name: true, phone: true } },
      }
    });

    const broadcastData = {
      job: {
        id: updatedJob.id,
        status: updatedJob.status,
        mechanic: updatedJob.mechanic ? `${updatedJob.mechanic.first_name || ""} ${updatedJob.mechanic.last_name || ""}`.trim() : null,
        mechanic_phone: updatedJob.mechanic?.phone,
      }
    };

    // Notify the specific customer channel that their job was updated
    await pusherServer.trigger(`customer-${updatedJob.customer_id}`, "job_updated", broadcastData);
    
    // Notify the admin channel of the status change
    await pusherServer.trigger("admin-channel", "job_updated", broadcastData);
    
    // Notify the mechanics channel so the job disappears from the "Available" pool for others
    await pusherServer.trigger("mechanics-channel", "job_updated", broadcastData);

    return NextResponse.json({ message: "Job updated", job: updatedJob }, { status: 200 });
  } catch (error) {
    console.error("Job PATCH error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
