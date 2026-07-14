const fs = require('fs');
const files = [
  'app/vendor/overview/page.tsx',
  'app/vendor/inventory/page.tsx',
  'app/vendor/orders/page.tsx',
  'app/vendor/payouts/page.tsx',
  'app/vendor/qa-reports/page.tsx'
];

const vendorItems = `[
  { icon: "grid_view", label: "Overview", href: "/vendor/overview" },
  { icon: "inventory_2", label: "Inventory", href: "/vendor/inventory" },
  { icon: "receipt_long", label: "Orders", href: "/vendor/orders" },
  { icon: "account_balance", label: "Payouts", href: "/vendor/payouts" },
  { icon: "fact_check", label: "QA Reports", href: "/vendor/qa-reports" },
]`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add import if missing
    if (!content.includes('BottomNavBar')) {
      // Find last import
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + 'import BottomNavBar from "../../components/BottomNavBar";\n' + content.slice(endOfLine + 1);
    }

    // Determine active tab label
    let activeTab = "Overview";
    if (file.includes('inventory')) activeTab = "Inventory";
    if (file.includes('orders')) activeTab = "Orders";
    if (file.includes('payouts')) activeTab = "Payouts";
    if (file.includes('qa-reports')) activeTab = "QA Reports";

    // Replace the `<nav>` block with BottomNavBar
    const regex = /<nav className="md:hidden[^>]*>[\s\S]*?<\/nav>/;
    if (regex.test(content)) {
      content = content.replace(regex, `<BottomNavBar activeTab="${activeTab}" items={${vendorItems}} />`);
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No nav found in ${file}`);
    }
  }
});
