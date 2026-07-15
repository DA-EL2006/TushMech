export interface CarDatabaseEntry {
  brand: string;
  country: string;
  model: string;
  year: number;
  transmission: string;
  engineType: string;
  fuelType: string;
  imageUrl: string;
}

export const carDatabase: CarDatabaseEntry[] = [
  { brand: "Toyota", country: "Japan", model: "Camry", year: 2018, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://www.toyotanigeria.com/wp-content/uploads/2025/07/Camry_4.jpg" },
  { brand: "Toyota", country: "Japan", model: "Camry", year: 2021, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://www.billpagetoyota.com/assets/shared/CustomHTMLFiles/Responsive/MRP/Toyota/2021/Camry/images/2021-Toyota-Camry-Hero1.jpg" },
  { brand: "Toyota", country: "Japan", model: "Corolla", year: 2016, transmission: "Automatic", engineType: "1.8L 4-Cyl", fuelType: "Petrol", imageUrl: "https://platform.cstatic-images.com/in/v2/stock_photos/a01dc5bc-a1f2-4f55-9ee9-14f92c1d3f1c/0c3546b6-ff7f-4a16-b788-192b51afa53e.png" },
  { brand: "Toyota", country: "Japan", model: "Corolla", year: 2020, transmission: "CVT", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://platform.cstatic-images.com/in/v2/stock_photos/e2ab969a-16d3-4f2a-89f7-308ed612d3b2/4609aeca-0543-463c-80ef-e1ad4104f4f6.png" },
  { brand: "Toyota", country: "Japan", model: "Hilux", year: 2019, transmission: "Manual", engineType: "2.8L Turbo Diesel", fuelType: "Diesel", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQM0g1vrARVOSADNuhErgqOWXAGQeq25fsNeSAUDpZNQELm29Vi2_ug36D&s=10" },
  { brand: "Toyota", country: "Japan", model: "Hilux", year: 2022, transmission: "Automatic", engineType: "2.7L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2kgfS0MynwH-sRhuhrBPaHBCofxhnagZSC1Nly7cfTXVA6fiEkJRWzU&s=10" },
  { brand: "Toyota", country: "Japan", model: "Highlander", year: 2017, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://images.hgmsites.net/med/2017-toyota-highlander-limited-platinum-v6-fwd-natl-angular-front-exterior-view_100602365_m.jpg" },
  { brand: "Toyota", country: "Japan", model: "Highlander", year: 2023, transmission: "Automatic", engineType: "2.4L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpeX_Ph4UbgN-C2Kgry-8Y2nUrtjuMMrx3fJE4c8HyYF-0EyOMP5L2hI6y&s=10" },
  { brand: "Toyota", country: "Japan", model: "RAV4", year: 2015, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkxf342AnKNHEymiUmIilwYvgSWLpCq1n5GCfmglu6468KMi-qRgHw5kQ&s=10" },
  { brand: "Toyota", country: "Japan", model: "Land Cruiser", year: 2021, transmission: "Automatic", engineType: "5.7L V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0HMTt7k9qv4AgZzqJ07MFAupfiZs76ph9G0_-8Jx0-IiJ_eWPnzsDAs&s=10" },

  { brand: "Honda", country: "Japan", model: "Accord", year: 2017, transmission: "Automatic", engineType: "2.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnKwCeffUSJU3h_E_yeLFe0SsCQbFzSAoV7QlIl7x6oxhIgx23HSI0-4&s=10" },
  { brand: "Honda", country: "Japan", model: "Accord", year: 2022, transmission: "CVT", engineType: "1.5L Turbo", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQju2qNbwFgVN8zB08Auf744HDHjgVKOOQblBXAKDqB7XeB3kK10ZunY&s=10" },
  { brand: "Honda", country: "Japan", model: "Civic", year: 2016, transmission: "Manual", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLW83Zzm3dkH6lPpEYvXuKXNZz5IdEaqCxbvo3sOoh1rbRUZLoBqe8OXnZ&s=10" },
  { brand: "Honda", country: "Japan", model: "Civic", year: 2020, transmission: "CVT", engineType: "1.5L Turbo", fuelType: "Petrol", imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/27074/civic-exterior-right-front-three-quarter-148155.jpeg?q=80" },
  { brand: "Honda", country: "Japan", model: "CR-V", year: 2018, transmission: "CVT", engineType: "2.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_vA68S7wA1lumpkg99llgsG6G4Z94bWUonSkcF8_LjTW1Q0feV2dNcM&s=10" },
  { brand: "Honda", country: "Japan", model: "CR-V", year: 2023, transmission: "CVT", engineType: "1.5L Turbo", fuelType: "Petrol", imageUrl: "https://images.wsj.net/im-837724?width=700&height=466" },
  { brand: "Honda", country: "Japan", model: "Pilot", year: 2019, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://images.cars.ng/images/cars-ng/product_honda_pilot_2019_2b547c_1_650x450.jpg" },
  { brand: "Honda", country: "Japan", model: "Pilot", year: 2021, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFkWv4FRsRC6r4FTs51UqUU9z0kQQ3eceb4IsOgXo8aDIJvwNsMqYVBTL&s=10" },
  { brand: "Honda", country: "Japan", model: "Fit", year: 2015, transmission: "CVT", engineType: "1.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0plW8Dqi5mRdt_rXHRahRhrCS8lOT2qTxtSckmii3_yQ_3rRswJedNpF7&s=10" },
  { brand: "Honda", country: "Japan", model: "HR-V", year: 2020, transmission: "CVT", engineType: "1.8L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqv_Rl7dI5nnT7tvV6oAORwZWcLd6CLDiRwAcCi18c_JA8tJkFaeFX7s&s=10" },

  { brand: "Mercedes-Benz", country: "Germany", model: "C-Class (C300)", year: 2016, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://cars.usnews.com/static/images/Auto/izmo/i238999/2016_mercedes_benz_c_class_angularfront.jpg" },
  { brand: "Mercedes-Benz", country: "Germany", model: "C-Class (C300)", year: 2022, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://images.hgmsites.net/lrg/2022-mercedes-benz-c-class-c-300-sedan-angular-front-exterior-view_100847662_l.jpg" },
  { brand: "Mercedes-Benz", country: "Germany", model: "E-Class (E350)", year: 2018, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/18q1/699327/2018-mercedes-benz-e350e-plug-in-hybrid-first-drive-review-car-and-driver-photo-699615-s-original.jpg?fill=1:1&resize=1200:*" },
  { brand: "Mercedes-Benz", country: "Germany", model: "E-Class (E450)", year: 2021, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHqBIPf87X_fAx943WHdMteJ4G-AVrrsuIgqmC_dP9U7FolIqWP6mt62Q&s=10" },
  { brand: "Mercedes-Benz", country: "Germany", model: "G-Class (G63)", year: 2019, transmission: "Automatic", engineType: "4.0L BiTurbo V8", fuelType: "Petrol", imageUrl: "https://images.autobahn-qatar.com/10875/4201/autobahn-automotive-lg.jpeg" },
  { brand: "Mercedes-Benz", country: "Germany", model: "G-Class (G550)", year: 2023, transmission: "Automatic", engineType: "4.0L BiTurbo V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMIJ7nWT9uIHeDOLKXyt3Qh800y-uP4GJdy0btZtVkSlSGea5M7B_Ohk&s=10" },
  { brand: "Mercedes-Benz", country: "Germany", model: "GLE 350", year: 2020, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSZb9WR731OJYqEPncvpkD_yQ3bF87Oa_a3OM0Zp8aE6DY8audoYbaP0&s=10" },
  { brand: "Mercedes-Benz", country: "Germany", model: "GLE 450", year: 2023, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2023-mercedes-benz-gls450-exterior-103-6732413d5df26.jpg?crop=0.753xw:0.564xh;0.178xw,0.288xh&resize=640:*" },
  { brand: "Mercedes-Benz", country: "Germany", model: "S-Class (S550)", year: 2017, transmission: "Automatic", engineType: "4.7L BiTurbo V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBPY-6pPu5J_smLlHziuMSbUJk0WJh7uvg70BdK_llcASOyZEbDBaxJHR&s=10" },
  { brand: "Mercedes-Benz", country: "Germany", model: "S-Class (S500)", year: 2022, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGus-xHKLRHyD0ZFPJiR1PkYMbSSCX1uClf2VFpoAJIWqOkLtW1k5iuZM&s=10" },

  { brand: "BMW", country: "Germany", model: "3 Series (320i)", year: 2015, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://thumbs.dreamstime.com/b/white-sedan-bmw-series-i-street-medan-north-sumatra-indonesia-oct-bmw-series-i-345259457.jpg" },
  { brand: "BMW", country: "Germany", model: "3 Series (330i)", year: 2021, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://vehicle-images.carscommerce.inc/3c7a-110008840/3MW5R1J07M8B79727/8ea986c8fb3cb094f199df120986c645.jpg" },
  { brand: "BMW", country: "Germany", model: "5 Series (530i)", year: 2018, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYnY5AmIUcKTDBl0pDSfm46_xS937nO2OWN4YCnFzE0zwbJ9Ztj6mF374&s=10" },
  { brand: "BMW", country: "Germany", model: "5 Series (540i)", year: 2022, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://content.homenetiol.com/2000292/2257496/0x0/stock_images/8/cc_2022BMC10_01_640/cc_2022BMC100017_01_640_416.jpg" },
  { brand: "BMW", country: "Germany", model: "X3", year: 2017, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YjDRdZXVD4CjsWjUPHUsScV72eSNc-pzQv1VqegIFMbUaZQ19L5tYgRX&s=10" },
  { brand: "BMW", country: "Germany", model: "X3", year: 2023, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNGBJCUuQXDFyk2yXGLirp-PKFmhgTQjDbsPtI-baKpNNfNf4IY-vruA&s=10" },
  { brand: "BMW", country: "Germany", model: "X5", year: 2019, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJs1QUtCQCB-IIov7KQWsIwKTu5fQthPBAnMpwHaEEz1hNYHm1cS76XpE&s=10" },
  { brand: "BMW", country: "Germany", model: "X5", year: 2024, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCRTfQrnffByH7kTMwd_JKZYVp1bvxr-n_kTXpNkZOfkHxMubHV2kWAQ&s=10" },
  { brand: "BMW", country: "Germany", model: "7 Series (740i)", year: 2016, transmission: "Automatic", engineType: "3.0L Turbo Inline-6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnW4L8ig6KnXubrJiF6-2E6Az-3VnXntwKnPsyfbTugg3ruAPfbng7l9M&s=10" },
  { brand: "BMW", country: "Germany", model: "7 Series (750i)", year: 2020, transmission: "Automatic", engineType: "4.4L Twin-Turbo V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlSy68DTHAhG8YNcx5cJt0WyFRgRyG3Bf4mduX7SM1lcwSnfq12x2n7zhW&s=10" },

  { brand: "Ford", country: "USA", model: "F-150", year: 2018, transmission: "Automatic", engineType: "3.5L EcoBoost V6", fuelType: "Petrol", imageUrl: "https://platform.cstatic-images.com/in/v2/stock_photos/68368011-cc09-4ddf-a7ca-a85eff52de49/71b5e000-e9d7-4c22-a6f0-28ff9d2afb89.png" },
  { brand: "Ford", country: "USA", model: "F-150", year: 2022, transmission: "Automatic", engineType: "5.0L V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIicrOxR2DVZXLrc1TjpEAU_ju7-OtBuxdJWuwOdhpGBNZUnI8fLBJat4&s=10" },
  { brand: "Ford", country: "USA", model: "Mustang", year: 2017, transmission: "Manual", engineType: "5.0L V8", fuelType: "Petrol", imageUrl: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/cab06a4333a41a50778fd4f37f0d12d0517fdd80/photos/3Ol7loyv-q273zv76p-.jpg?t=163348434456" },
  { brand: "Ford", country: "USA", model: "Mustang", year: 2021, transmission: "Automatic", engineType: "2.3L EcoBoost 4-Cyl", fuelType: "Petrol", imageUrl: "https://d2ivfcfbdvj3sm.cloudfront.net/kLwAn7LPYg24EyF8/15024/stills_0640_png/MY2021/15024/15024_st0640_116.webp?c=172&p=164&m=1&o=png&s=QnvrwhBQ9flre4azHJnr1Y" },
  { brand: "Ford", country: "USA", model: "Explorer", year: 2016, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO8sVUqDLwGHFyIzW25rpx0UeBwzlLky1VGnu9guzn2tAglw_dPPAlnRE&s=10" },
  { brand: "Ford", country: "USA", model: "Explorer", year: 2020, transmission: "Automatic", engineType: "2.3L EcoBoost 4-Cyl", fuelType: "Petrol", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2020-ford-explorer-platinum-101-1560790472.jpg?crop=0.7329140461215933xw:1xh;center,top&resize=1200:*" },
  { brand: "Ford", country: "USA", model: "Escape", year: 2015, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://images.hgmsites.net/lrg/2015-ford-escape-fwd-4-door-s-angular-front-exterior-view_100477425_l.jpg" },
  { brand: "Ford", country: "USA", model: "Escape", year: 2022, transmission: "Automatic", engineType: "1.5L EcoBoost 3-Cyl", fuelType: "Petrol", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/21-escp-se-hydsprtpckg-34frntpassmotnfrrstrd-mj-1635199969.jpg?crop=0.905xw:0.669xh;0.0673xw,0.175xh&resize=2048:*" },
  { brand: "Ford", country: "USA", model: "Edge", year: 2019, transmission: "Automatic", engineType: "2.0L EcoBoost 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCoKMjAQZWYoZwe74QHycQ9x2E4_2zQZXSqjUn-W-JhA&s" },
  { brand: "Ford", country: "USA", model: "Ranger", year: 2021, transmission: "Automatic", engineType: "2.3L EcoBoost 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2dJodjqU4AV8TNJegO-6FSRH0fkebrxFwrrI0ltj0Eg&s" },

  { brand: "Hyundai", country: "South Korea", model: "Elantra", year: 2016, transmission: "Automatic", engineType: "1.8L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSOgYlPI5DRLftskeNFl23O9kRVYxPnMNomtG3VkyaKsjzsw9wWZnryc&s=10" },
  { brand: "Hyundai", country: "South Korea", model: "Elantra", year: 2021, transmission: "CVT", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://www.cnet.com/a/img/resize/c0db001d0c256c872c40ce1d79ff34e8a89870a7/hub/2021/03/05/b9de586d-9752-47f9-8b3a-f004cd972cf7/2021-hyundai-elantra-sel-ogi-1.jpg?auto=webp&fit=crop&height=900&width=1200" },
  { brand: "Hyundai", country: "South Korea", model: "Sonata", year: 2015, transmission: "Automatic", engineType: "2.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6aNUZu5wViw3Bh41GuROOXuLRcTqGDJwTkiu_-LXqZiIa8d3FJDY6a4&s=10" },
  { brand: "Hyundai", country: "South Korea", model: "Sonata", year: 2022, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMC6Xs1iQODj66qiA8hNCvXVVJl0usZdFc21P7Q947FqtA8iIOUktH3bc&s=10" },
  { brand: "Hyundai", country: "South Korea", model: "Tucson", year: 2017, transmission: "Automatic", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://d2ivfcfbdvj3sm.cloudfront.net/_IO3L3JKK_fzoTrb/11436/stills_0640_png/MY2017/11436/11436_st0640_116.webp?c=172&p=164&m=1&o=png&s=ez3UMv0E44PqAkDvpCpnzF" },
  { brand: "Hyundai", country: "South Korea", model: "Tucson", year: 2023, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmNKC_J6gnjDovXv8xEGN5plJ7c-wuj2kklrTHp2BDp8W3idR1yPJrsTM&s=10" },
  { brand: "Hyundai", country: "South Korea", model: "Santa Fe", year: 2018, transmission: "Automatic", engineType: "2.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRorjahwlw2R990fID35NZ0gNzaHrECS9zXN8xdKJJYf00Zj0AXTCuQ8yQ&s=10" },
  { brand: "Hyundai", country: "South Korea", model: "Santa Fe", year: 2024, transmission: "Automatic", engineType: "2.5L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://cdn.motor1.com/images/mgl/2NAmLM/s3/2024-hyundai-santa-fe.jpg" },
  { brand: "Hyundai", country: "South Korea", model: "Accent", year: 2014, transmission: "Manual", engineType: "1.6L 4-Cyl", fuelType: "Petrol", imageUrl: "https://cars.usnews.com/static/images/Auto/izmo/i4678/2014_hyundai_accent_angularfront.jpg" },
  { brand: "Hyundai", country: "South Korea", model: "Creta", year: 2020, transmission: "Automatic", engineType: "1.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXOdS02XfEkjd2ICu5HJ5_JpIa8LVDn8O2CYYTTHPKclnKQxnqIMXcJA&s=10" },

  { brand: "Nissan", country: "Japan", model: "Altima", year: 2016, transmission: "CVT", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://cars.usnews.com/static/images/Auto/izmo/i2314279/2016_nissan_altima_angularfront.jpg" },
  { brand: "Nissan", country: "Japan", model: "Altima", year: 2021, transmission: "CVT", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEl1HKrX6IopjCSf9sQkiUwCTAVupWW04KtFo1tfFFXswbXweAcnlGRn6&s=10" },
  { brand: "Nissan", country: "Japan", model: "Sentra", year: 2017, transmission: "CVT", engineType: "1.8L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IVDp_HCYF_hE1tJkkACPuJw9KinftOr2KNRpqegSN94GNuBXaGcbVOQy&s=10" },
  { brand: "Nissan", country: "Japan", model: "Sentra", year: 2022, transmission: "CVT", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnVW2oaEnlWgMMc9XcPQVBLObTnhVB_cVFV6gvEvl6CEQX7JnWI3sBTo0&s=10" },
  { brand: "Nissan", country: "Japan", model: "Rogue", year: 2015, transmission: "CVT", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhJWRggY6vK610ECQgsbaUQbGzmqJshbNoVqor3WFgMg&s" },
  { brand: "Nissan", country: "Japan", model: "Rogue", year: 2023, transmission: "CVT", engineType: "1.5L Turbo 3-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfp4avdAzdQOv--5gNyxMhL7xmTwcKqXCFRMjn15rJOw&s" },
  { brand: "Nissan", country: "Japan", model: "Pathfinder", year: 2018, transmission: "CVT", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRrD4PGT0toFi2dSGiZSlmObyG843GHrKsOsfzdUElg&s" },
  { brand: "Nissan", country: "Japan", model: "Pathfinder", year: 2024, transmission: "Automatic", engineType: "3.5L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn42a-LACkmtn7s3bYYaauwqVZU4yrCnB33c3i0N6xXAPp5oNIno8ygSX&s=10" },
  { brand: "Nissan", country: "Japan", model: "Patrol", year: 2019, transmission: "Automatic", engineType: "5.6L V8", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVTNDqsK-kwwlNLLKvHm6J1Sf8kAozv4or6Mgb-ujxkjFTdN3bAi8I1kU&s=10" },
  { brand: "Nissan", country: "Japan", model: "Navara", year: 2020, transmission: "Manual", engineType: "2.5L Turbo Diesel", fuelType: "Diesel", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNE-kLTR28s_gXOtG-iiANexprPAD6ptmO7S4RRdh-rwSNCdBJ-70lZw&s=10" },

  { brand: "Kia", country: "South Korea", model: "Rio", year: 2015, transmission: "Manual", engineType: "1.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBF0Sha7nvCRnja9yFO30xuxzf81om5fwjGFIbW-k1B8zcgQikBtLuDt2D&s=10" },
  { brand: "Kia", country: "South Korea", model: "Rio", year: 2021, transmission: "Automatic", engineType: "1.6L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqSna7Um0kfnEp5DZA6HDBbSU8EHXvphGpfRlZ8Whts055aJpRWShueXc&s=10" },
  { brand: "Kia", country: "South Korea", model: "Optima", year: 2017, transmission: "Automatic", engineType: "2.4L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRIJuVJKhW_EsnsPlAsbg0kQkAFtxsVgsc9S8TL9KwkVHU8ZdC8-0Sunkq&s=10" },
  { brand: "Kia", country: "South Korea", model: "K5", year: 2023, transmission: "Automatic", engineType: "1.6L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPc-qWYmZgsyGsZq7j24XiYAL1rzmWoDmhsHI9hXH4Z6kpix4TdiBtAy06&s=10" },
  { brand: "Kia", country: "South Korea", model: "Sportage", year: 2018, transmission: "Automatic", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcUcZ5uob_XYNnsd8-vbWQbsFPXLccwKsGznbi3OTwCA&s" },
  { brand: "Kia", country: "South Korea", model: "Sportage", year: 2024, transmission: "Automatic", engineType: "2.5L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT37hKnt1vTvs3w55Ic4pWjYU4_sVoWWDcXB2IVEvbkcNIZ0lxPxBbocG04&s=10" },
  { brand: "Kia", country: "South Korea", model: "Sorento", year: 2019, transmission: "Automatic", engineType: "3.3L V6", fuelType: "Petrol", imageUrl: "https://cars.usnews.com/static/images/Auto/izmo/i100899629/2019_kia_sorento_angularfront.jpg" },
  { brand: "Kia", country: "South Korea", model: "Telluride", year: 2022, transmission: "Automatic", engineType: "3.8L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPi9oMgZMw2oMPhAExOErR1rUYVIeQvEKGKY0QAm9LSs_e5NRbPmzyiWy&s=10" },
  { brand: "Kia", country: "South Korea", model: "Picanto", year: 2016, transmission: "Automatic", engineType: "1.2L 4-Cyl", fuelType: "Petrol", imageUrl: "https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/caradvice/private/c4a73e08db7b2ff8567a203a76608ea0" },
  { brand: "Kia", country: "South Korea", model: "Cerato", year: 2020, transmission: "Automatic", engineType: "2.0L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nupMcKlWhDC-tU0O6mPoHV386LumHd3pHwIYKi58Bdi3Dwwem9MkxRvX&s=10" },

  { brand: "Volkswagen", country: "Germany", model: "Golf", year: 2015, transmission: "Automatic", engineType: "1.8L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0WUVcYvRW46Yqxo_PREN9Q9NcohfsA531YO0qtys_OXNxey4y6Leumto&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Golf", year: 2021, transmission: "Manual", engineType: "1.4L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGdgWZDOxeZPCz4ktOGpe7M5yFAIrkDUaoG0KzEeVvsV0LiBiiU94OkSQ&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Jetta", year: 2017, transmission: "Automatic", engineType: "1.4L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://cars.usnews.com/static/images/Auto/izmo/i18180355/2017_volkswagen_jetta_angularfront.jpg" },
  { brand: "Volkswagen", country: "Germany", model: "Jetta", year: 2023, transmission: "Automatic", engineType: "1.5L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://di-uploads-pod33.dealerinspire.com/volkswagenofmarion/uploads/2023/01/2023-vw-jetta-profile-580h.jpg" },
  { brand: "Volkswagen", country: "Germany", model: "Passat", year: 2016, transmission: "Automatic", engineType: "1.8L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9lRWrjZfGhRodj0iD8eerBuJJNzktHNlfyp2JdX_QdNAbv91foJVlmvJ&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Passat", year: 2022, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_5ahcRZg0Y2GxuYWlzHOlowfW1qoJikSIJdxqlbqLWTVPUk3_ZSX1Nw&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Tiguan", year: 2018, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjXr0JCJhzivx_KWvlsqnTtBp7FcFHySRnrv3URCXSCy1GvyqNzHRvs9L&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Tiguan", year: 2024, transmission: "Automatic", engineType: "2.0L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkFIKnhPOAk5LxD271Ke_A2kuOESO3jRlZ51R9H9wfzEknymN_FIXSccH&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Touareg", year: 2017, transmission: "Automatic", engineType: "3.6L V6", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIbbklpn5vA8GctrlC3CefBrbA3yf6b55jcy8b82L9xnfog7GBVwUM6rA&s=10" },
  { brand: "Volkswagen", country: "Germany", model: "Atlas", year: 2021, transmission: "Automatic", engineType: "3.6L V6", fuelType: "Petrol", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2021-volkswagen-atlas-v6-sel-r-line-191-1589573472.jpg?crop=0.744xw:0.558xh;0.0929xw,0.389xh&resize=1200:*" },

  { brand: "Peugeot", country: "France", model: "301", year: 2018, transmission: "Manual", engineType: "1.6L 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa82yeLKOmO5o7OOfx5eejGz3v42mrFc7FgV4POE7jlMrb5cpyt_5oZ8&s=10" },
  { brand: "Peugeot", country: "France", model: "301", year: 2022, transmission: "Automatic", engineType: "1.6L 4-Cyl", fuelType: "Petrol", imageUrl: "https://cache3.arabwheels.ae/system/car_generation_pictures/28758/original/Cover.?1730334093" },
  { brand: "Peugeot", country: "France", model: "508", year: 2016, transmission: "Automatic", engineType: "1.6L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwJv64sBfNAKCJfCt5YZPmfRVaq_PaDPZpaISuZ-dXni0TtIDamctpfs&s=10" },
  { brand: "Peugeot", country: "France", model: "508", year: 2023, transmission: "Automatic", engineType: "1.6L Plug-in Hybrid", fuelType: "Hybrid", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HiRpfn6sYUchJ6Q9z6qFndmm2Dad4goq3ijRFDhX_CEQ9Etivg_8SNkU&s=10" },
  { brand: "Peugeot", country: "France", model: "3008", year: 2019, transmission: "Automatic", engineType: "1.6L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://media.istockphoto.com/id/1463460582/photo/peugeot-3008-is-a-compact-crossover-suv-manufactured-by-french-automaker-peugeot.jpg?s=612x612&w=0&k=20&c=7XIol1BFiB1NF9uQH96afWJFFbtb9qFnxY49FGpVgPE=" },
  { brand: "Peugeot", country: "France", model: "3008", year: 2024, transmission: "Automatic", engineType: "1.2L Mild Hybrid", fuelType: "Hybrid", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfPsnkB-evt7YRvIMQtaC2NoiUrN3U-dCeCH8Q-HPeg&s" },
  { brand: "Peugeot", country: "France", model: "5008", year: 2020, transmission: "Automatic", engineType: "1.6L Turbo 4-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBAE7IUhprFX53yZSqwjBDIOqx9GtIqggp4N6lcbr8WNflxb4eJfSR64&s=10" },
  { brand: "Peugeot", country: "France", model: "208", year: 2017, transmission: "Manual", engineType: "1.2L 3-Cyl", fuelType: "Petrol", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnhvS9E33WjtkAdGpi-iqjZeYhIOuP9WnmoWVuXHSzQ&s" },
  { brand: "Peugeot", country: "France", model: "208", year: 2023, transmission: "Automatic", engineType: "Electric", fuelType: "Electric", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe9Sqafuq8ZAG4QOfxLhXJvzF1oIsujYLpveeWG2VtCNEYroSsvDjGNlWn&s=10" },
  { brand: "Peugeot", country: "France", model: "Landtrek", year: 2022, transmission: "Manual", engineType: "1.9L Turbo Diesel", fuelType: "Diesel", imageUrl: "https://www.peugeotnigeria.com/content/dam/peugeot/master/b2c/our-range/landtrek/l-m/bbc/Landtrek_810x455.png" }
];

export function findMatchingCarImage(details: {
  make?: string;
  model?: string;
  year?: string | number;
  transmission?: string;
  fuelType?: string;
  engine?: string;
}): string | null {
  if (!details.make && !details.model) return null;

  let bestMatch = null;
  let highestScore = 0;

  for (const car of carDatabase) {
    let score = 0;
    
    // Brand/Make match (high weight)
    if (details.make && car.brand.toLowerCase().includes(details.make.toLowerCase())) {
      score += 3;
    }
    
    // Model match (high weight)
    if (details.model && car.model.toLowerCase().includes(details.model.toLowerCase())) {
      score += 3;
    }
    
    // Year match
    if (details.year && car.year.toString() === details.year.toString()) {
      score += 1;
    }
    
    // Transmission match
    if (details.transmission && car.transmission.toLowerCase() === details.transmission.toLowerCase()) {
      score += 1;
    }
    
    // Fuel type match
    if (details.fuelType && car.fuelType.toLowerCase() === details.fuelType.toLowerCase()) {
      score += 1;
    }
    
    // Engine type match
    if (details.engine && car.engineType.toLowerCase().includes(details.engine.toLowerCase())) {
      score += 1;
    }

    // Require at least a decent match (e.g. make or model match)
    if (score > highestScore && score >= 2) {
      highestScore = score;
      bestMatch = car;
    }
  }

  return bestMatch?.imageUrl || null;
}
