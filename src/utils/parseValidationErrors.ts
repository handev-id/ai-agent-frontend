import { ValidationErrors } from "../types/api-errors";

/**
 * Mapping nama field ke label yang lebih user-friendly (camelCase)
 */
const fieldLabels: Record<string, string> = {
  // User fields
  email: 'Email',
  password: 'Password',
  passwordConfirmation: 'Konfirmasi Password',
  currentPassword: 'Password Saat Ini',
  newPassword: 'Password Baru',
  phone: 'Nomor Telepon',
  fullName: 'Nama Lengkap',
  username: 'Username',
  firstName: 'Nama Depan',
  lastName: 'Nama Belakang',
  birthDate: 'Tanggal Lahir',
  
  // Address fields
  addressLine1: 'Alamat Baris 1',
  addressLine2: 'Alamat Baris 2',
  postalCode: 'Kode Pos',
  city: 'Kota',
  province: 'Provinsi',
  country: 'Negara',
  
  // Product fields
  productName: 'Nama Produk',
  productCode: 'Kode Produk',
  price: 'Harga',
  stock: 'Stok',
  description: 'Deskripsi',
  
  // Payment fields
  cardNumber: 'Nomor Kartu',
  cardHolder: 'Pemilik Kartu',
  expiryDate: 'Tanggal Kedaluwarsa',
  cvv: 'CVV',
  
  // General
  title: 'Judul',
  content: 'Konten',
  attachment: 'Lampiran',
  termsAccepted: 'Persyaratan',
};

/**
 * Mendapatkan label untuk field
 */
function getFieldLabel(field: string): string {
  return fieldLabels[field] || 
    field.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

/**
 * Translator untuk semua rule VineJS → Bahasa Indonesia
 */
const errorMessages: Record<string, string | ((error: ValidationErrors) => string)> = {
  // ========================
  // STRING VALIDATIONS
  // ========================
  required: (error) => `${getFieldLabel(error.field)} harus diisi`,
  string: (error) => `${getFieldLabel(error.field)} harus berupa teks`,
  email: (error) => `${getFieldLabel(error.field)} harus berupa email yang valid`,
  regex: (error) => `Format ${getFieldLabel(error.field)} tidak valid`,
  ascii: (error) => `${getFieldLabel(error.field)} hanya boleh mengandung karakter ASCII`,
  alpha: (error) => `${getFieldLabel(error.field)} hanya boleh mengandung huruf`,
  alphaNumeric: (error) => `${getFieldLabel(error.field)} hanya boleh mengandung huruf dan angka`,
  creditCard: (error) => `${getFieldLabel(error.field)} harus berupa nomor kartu kredit yang valid`,
  uuid: (error) => `${getFieldLabel(error.field)} harus berupa UUID yang valid`,
  minLength: (error) => `${getFieldLabel(error.field)} minimal ${error.meta?.min} karakter`,
  maxLength: (error) => `${getFieldLabel(error.field)} maksimal ${error.meta?.max} karakter`,
  fixedLength: (error) => `${getFieldLabel(error.field)} harus ${error.meta?.length} karakter`,
  trim: (error) => `${getFieldLabel(error.field)} tidak boleh mengandung spasi di awal atau akhir`,
  escape: (error) => `${getFieldLabel(error.field)} mengandung karakter yang tidak diizinkan`,
  lowercase: (error) => `${getFieldLabel(error.field)} harus menggunakan huruf kecil`,
  uppercase: (error) => `${getFieldLabel(error.field)} harus menggunakan huruf besar`,
  url: (error) => `${getFieldLabel(error.field)} harus berupa URL yang valid`,
  ipAddress: (error) => `${getFieldLabel(error.field)} harus berupa alamat IP yang valid`,
  activeUrl: (error) => `${getFieldLabel(error.field)} harus berupa URL yang aktif`,

  // ========================
  // NUMBER VALIDATIONS
  // ========================
  number: (error) => `${getFieldLabel(error.field)} harus berupa angka`,
  integer: (error) => `${getFieldLabel(error.field)} harus bilangan bulat`,
  float: (error) => `${getFieldLabel(error.field)} harus bilangan desimal`,
  positive: (error) => `${getFieldLabel(error.field)} harus angka positif`,
  negative: (error) => `${getFieldLabel(error.field)} harus angka negatif`,
  range: (error) => `${getFieldLabel(error.field)} harus antara ${error.meta?.min} dan ${error.meta?.max}`,
  min: (error) => `${getFieldLabel(error.field)} minimal ${error.meta?.min}`,
  max: (error) => `${getFieldLabel(error.field)} maksimal ${error.meta?.max}`,

  // ========================
  // DATE VALIDATIONS
  // ========================
  date: (error) => `${getFieldLabel(error.field)} harus berupa tanggal yang valid`,
  after: (error) => `${getFieldLabel(error.field)} harus setelah ${formatDate(error.meta?.date)}`,
  before: (error) => `${getFieldLabel(error.field)} harus sebelum ${formatDate(error.meta?.date)}`,
  afterOrEqual: (error) => `${getFieldLabel(error.field)} harus setelah atau sama dengan ${formatDate(error.meta?.date)}`,
  beforeOrEqual: (error) => `${getFieldLabel(error.field)} harus sebelum atau sama dengan ${formatDate(error.meta?.date)}`,
  sameAs: (error) => `${getFieldLabel(error.field)} harus sama dengan ${getFieldLabel(error.meta?.otherField)}`,

  // ========================
  // FILE VALIDATIONS
  // ========================
  file: (error) => `${getFieldLabel(error.field)} harus berupa file`,
  size: (error) => `${getFieldLabel(error.field)} maksimal ${formatFileSize(error.meta?.size)}`,
  extname: (error) => `${getFieldLabel(error.field)} harus berekstensi ${error.meta?.extnames?.join(', ') || 'yang valid'}`,
  mimeType: (error) => `${getFieldLabel(error.field)} harus bertipe ${error.meta?.types?.join(', ') || 'yang valid'}`,

  // ========================
  // BOOLEAN VALIDATIONS
  // ========================
  boolean: (error) => `${getFieldLabel(error.field)} harus berupa nilai benar/salah`,
  accepted: (error) => `${getFieldLabel(error.field)} harus diterima/dicentang`,
  declined: (error) => `${getFieldLabel(error.field)} harus ditolak/tidak dicentang`,

  // ========================
  // ARRAY VALIDATIONS
  // ========================
  array: (error) => `${getFieldLabel(error.field)} harus berupa array`,
  distinct: (error) => `${getFieldLabel(error.field)} tidak boleh mengandung duplikat`,
  minLengthArray: (error) => `${getFieldLabel(error.field)} minimal memiliki ${error.meta?.min} item`,
  maxLengthArray: (error) => `${getFieldLabel(error.field)} maksimal memiliki ${error.meta?.max} item`,

  // ========================
  // OBJECT VALIDATIONS
  // ========================
  object: (error) => `${getFieldLabel(error.field)} harus berupa object`,

  // ========================
  // RELATIONSHIP VALIDATIONS
  // ========================
  exists: (error) => `${getFieldLabel(error.field)} tidak valid atau tidak ditemukan`,

  // ========================
  // CUSTOM VALIDATIONS
  // ========================
  confirmed: (error) => `${getFieldLabel(error.field)} tidak cocok dengan ${getFieldLabel(error.meta?.otherField || 'konfirmasi')}`,
  unique: (error) => `${getFieldLabel(error.field)} sudah digunakan`,
  notExists: (error) => `${getFieldLabel(error.field)} sudah ada di sistem`,
};

/**
 * Format tanggal untuk pesan error
 */
function formatDate(date?: string): string {
  if (!date) return 'tanggal yang ditentukan';
  return new Date(date).toLocaleDateString('id-ID');
}

/**
 * Format ukuran file
 */
function formatFileSize(bytes?: number): string {
  if (!bytes) return '0 KB';
  return bytes < 1024 
    ? `${bytes} B` 
    : bytes < 1048576 
      ? `${(bytes / 1024).toFixed(0)} KB` 
      : `${(bytes / 1048576).toFixed(1)} MB`;
}

/**
 * Parsing error validasi VineJS
 */
export function parseValidationErrors(errors: ValidationErrors[]): ValidationErrors[] {
  return errors.map(error => {
    const messageBuilder = errorMessages[error.rule];
    const message = typeof messageBuilder === 'function'
      ? messageBuilder(error)
      : `${getFieldLabel(error.field)}: ${error.message}`;
    
    return { 
      ...error,
      message,
      fieldLabel: getFieldLabel(error.field) // Tambahkan label untuk referensi
    };
  });
}