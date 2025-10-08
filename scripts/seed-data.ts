import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedData() {
  console.log('Starting data seeding...');

  const profiles = [
    { id: '11111111-1111-1111-1111-111111111111', role: 'admin', name: 'مدير النظام', phone: '+963111111111', address: 'دمشق، سوريا' },
    { id: '22222222-2222-2222-2222-222222222222', role: 'merchant', name: 'متجر الإلكترونيات الذكية', phone: '+963222222222', address: 'دمشق، المزة' },
    { id: '33333333-3333-3333-3333-333333333333', role: 'merchant', name: 'متجر الأزياء العصرية', phone: '+963333333333', address: 'دمشق، أبو رمانة' },
    { id: '44444444-4444-4444-4444-444444444444', role: 'customer', name: 'أحمد محمد', phone: '+963444444444', address: 'دمشق، المالكي' },
    { id: '55555555-5555-5555-5555-555555555555', role: 'customer', name: 'فاطمة علي', phone: '+963555555555', address: 'دمشق، كفر سوسة' },
    { id: '66666666-6666-6666-6666-666666666666', role: 'delivery', name: 'سائق التوصيل السريع', phone: '+963666666666', address: 'دمشق' },
  ];

  console.log('Inserting profiles...');
  for (const profile of profiles) {
    const { error } = await supabase.from('profiles').upsert(profile);
    if (error) console.error('Profile error:', error);
    else console.log(`✓ Added profile: ${profile.name}`);
  }

  const products = [
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'هاتف ذكي سامسونج جالاكسي',
      description: 'هاتف ذكي بمواصفات عالية، شاشة 6.5 بوصة، كاميرا 108 ميجابكسل',
      price: 299.99,
      original_price: 399.99,
      category: 'إلكترونيات',
      stock: 15,
      sku: 'ELEC-PHONE-001',
      image_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.5,
      reviews_count: 23,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'لابتوب ديل XPS',
      description: 'لابتوب احترافي للعمل والألعاب، معالج i7، رام 16GB، SSD 512GB',
      price: 899.99,
      original_price: 1099.99,
      category: 'إلكترونيات',
      stock: 8,
      sku: 'ELEC-LAPTOP-001',
      image_url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.8,
      reviews_count: 45,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'سماعات بلوتوث لاسلكية',
      description: 'سماعات عالية الجودة مع إلغاء الضوضاء، بطارية 30 ساعة',
      price: 79.99,
      original_price: 99.99,
      category: 'إلكترونيات',
      stock: 30,
      sku: 'ELEC-HEADPHONE-001',
      image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.3,
      reviews_count: 67,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'ساعة ذكية أبل ووتش',
      description: 'ساعة ذكية بمستشعرات صحية متقدمة، مقاومة للماء',
      price: 349.99,
      original_price: 449.99,
      category: 'إلكترونيات',
      stock: 12,
      sku: 'ELEC-WATCH-001',
      image_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.7,
      reviews_count: 89,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'تابلت سامسونج جالاكسي',
      description: 'تابلت 10.5 بوصة مثالي للعمل والترفيه',
      price: 249.99,
      original_price: 299.99,
      category: 'إلكترونيات',
      stock: 20,
      sku: 'ELEC-TABLET-001',
      image_url: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.4,
      reviews_count: 34,
    },
    {
      merchant_id: '33333333-3333-3333-3333-333333333333',
      name: 'قميص رجالي كلاسيكي',
      description: 'قميص قطن 100% بتصميم عصري، متوفر بألوان متعددة',
      price: 29.99,
      original_price: 39.99,
      category: 'أزياء',
      stock: 50,
      sku: 'FASH-SHIRT-001',
      image_url: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.2,
      reviews_count: 12,
    },
    {
      merchant_id: '33333333-3333-3333-3333-333333333333',
      name: 'فستان نسائي سهرة',
      description: 'فستان أنيق للمناسبات الخاصة، قماش فاخر',
      price: 89.99,
      original_price: 129.99,
      category: 'أزياء',
      stock: 15,
      sku: 'FASH-DRESS-001',
      image_url: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.6,
      reviews_count: 28,
    },
    {
      merchant_id: '33333333-3333-3333-3333-333333333333',
      name: 'حذاء رياضي نايكي',
      description: 'حذاء رياضي مريح للجري والتمارين',
      price: 69.99,
      original_price: 89.99,
      category: 'أزياء',
      stock: 40,
      sku: 'FASH-SHOE-001',
      image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.5,
      reviews_count: 56,
    },
    {
      merchant_id: '33333333-3333-3333-3333-333333333333',
      name: 'حقيبة يد نسائية',
      description: 'حقيبة جلد طبيعي بتصميم عصري وأنيق',
      price: 59.99,
      original_price: 79.99,
      category: 'أزياء',
      stock: 25,
      sku: 'FASH-BAG-001',
      image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.4,
      reviews_count: 19,
    },
    {
      merchant_id: '33333333-3333-3333-3333-333333333333',
      name: 'نظارة شمسية راي بان',
      description: 'نظارة شمسية عصرية مع حماية UV',
      price: 49.99,
      original_price: 69.99,
      category: 'أزياء',
      stock: 35,
      sku: 'FASH-GLASSES-001',
      image_url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.3,
      reviews_count: 41,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'كاميرا رقمية كانون',
      description: 'كاميرا احترافية 24 ميجابكسل، مثالية للتصوير الفوتوغرافي',
      price: 599.99,
      original_price: 749.99,
      category: 'إلكترونيات',
      stock: 6,
      sku: 'ELEC-CAMERA-001',
      image_url: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.9,
      reviews_count: 67,
    },
    {
      merchant_id: '22222222-2222-2222-2222-222222222222',
      name: 'شاحن سريع لاسلكي',
      description: 'شاحن لاسلكي سريع 15W متوافق مع جميع الأجهزة',
      price: 24.99,
      original_price: 34.99,
      category: 'إلكترونيات',
      stock: 60,
      sku: 'ELEC-CHARGER-001',
      image_url: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      rating: 4.1,
      reviews_count: 143,
    },
  ];

  console.log('Inserting products...');
  for (const product of products) {
    const { error } = await supabase.from('products').upsert(product, { onConflict: 'sku' });
    if (error) console.error('Product error:', error);
    else console.log(`✓ Added product: ${product.name}`);
  }

  const wallets = [
    { user_id: '11111111-1111-1111-1111-111111111111', currency: 'USD', balance: 10000.00 },
    { user_id: '11111111-1111-1111-1111-111111111111', currency: 'SYP', balance: 5000000.00 },
    { user_id: '22222222-2222-2222-2222-222222222222', currency: 'USD', balance: 5000.00 },
    { user_id: '22222222-2222-2222-2222-222222222222', currency: 'SYP', balance: 2500000.00 },
    { user_id: '33333333-3333-3333-3333-333333333333', currency: 'USD', balance: 3000.00 },
    { user_id: '33333333-3333-3333-3333-333333333333', currency: 'SYP', balance: 1500000.00 },
    { user_id: '44444444-4444-4444-4444-444444444444', currency: 'USD', balance: 500.00 },
    { user_id: '44444444-4444-4444-4444-444444444444', currency: 'SYP', balance: 250000.00 },
    { user_id: '55555555-5555-5555-5555-555555555555', currency: 'USD', balance: 750.00 },
    { user_id: '55555555-5555-5555-5555-555555555555', currency: 'SYP', balance: 375000.00 },
    { user_id: '66666666-6666-6666-6666-666666666666', currency: 'USD', balance: 200.00 },
    { user_id: '66666666-6666-6666-6666-666666666666', currency: 'SYP', balance: 100000.00 },
  ];

  console.log('Inserting wallets...');
  for (const wallet of wallets) {
    const { error } = await supabase.from('wallets').upsert(wallet, { onConflict: 'user_id,currency' });
    if (error) console.error('Wallet error:', error);
    else console.log(`✓ Added wallet: ${wallet.user_id} (${wallet.currency})`);
  }

  console.log('\n✅ Data seeding completed!');
  console.log('\n📝 Test Accounts Info:');
  console.log('Admin: admin@foxbazzar.com');
  console.log('Merchant 1: merchant1@foxbazzar.com');
  console.log('Merchant 2: merchant2@foxbazzar.com');
  console.log('Customer 1: customer1@foxbazzar.com');
  console.log('Customer 2: customer2@foxbazzar.com');
  console.log('Delivery: delivery@foxbazzar.com');
  console.log('\nPassword for all: Test123456!');
}

seedData().catch(console.error);
