interface FAQItem {
  question: string;
  answer: string | React.ReactNode; // Allows for rich text answers
}

export const faqs: FAQItem[] = [
  {
    question: "Bagaimana cara memulai integrasi AI Agent ke aplikasi saya?",
    answer: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          Buat AI Agent melalui dashboard, lengkapi detail seperti nama, pesan
          sambutan, instruksi, dan sumber informasi.
        </li>
        <li>
          Lengkapi credential di tab Credentials, seperti Generative AI Key, API
          Key, Webhook URL, dan Client ID. Jaga kerahasiaan informasi ini.
        </li>
        <li>
          Pelajari dokumentasi API di tab DOCS, pahami cara autentikasi,
          endpoints, format request/response, error handling, dan batasan
          teknis.
        </li>
      </ol>
    ),
  },
  {
    question:
      "Apa perbedaan antara integrasi melalui RESTful API dan Embedded Code? Kapan sebaiknya saya menggunakan salah satunya?",
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-semibold">RESTful API:</span> Untuk komunikasi
          backend-to-backend. Cocok jika Anda memiliki server sendiri dan ingin
          kontrol penuh atas alur data.
        </li>
        <li>
          <span className="font-semibold">Embedded Code:</span> Untuk integrasi
          langsung ke frontend tanpa backend. Lebih sederhana dan cepat, cocok
          untuk proyek kecil atau prototipe.
        </li>
      </ul>
    ),
  },
  {
    question:
      "Bagaimana cara mengatasi masalah umum seperti error autentikasi atau timeout?",
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-semibold">Authentication Error:</span> Pastikan
          API Key yang digunakan sudah benar dan aktif.
        </li>
        <li>
          <span className="font-semibold">Timeout:</span> Periksa koneksi
          internet dan pastikan server AI Agent tidak sedang down. Coba
          tingkatkan timeout pada kode Anda.
        </li>
        <li>
          <span className="font-semibold">Invalid Payload:</span> Pastikan
          format data (JSON) yang dikirim sudah sesuai dengan dokumentasi API.
        </li>
      </ul>
    ),
  },
  {
    question: "Apa saja batasan penggunaan API yang perlu saya ketahui?",
    answer:
      "Biasanya ada batasan seperti rate limit (jumlah request per waktu tertentu) dan batasan ukuran request. Informasi lengkapnya ada di dokumentasi API.",
  },
  {
    question: "Apa itu embedded widget dan bagaimana cara kerjanya?",
    answer:
      "Embedded widget adalah potongan kode yang bisa ditempelkan langsung ke halaman web Anda. Widget ini akan menampilkan antarmuka AI Agent tanpa perlu backend tambahan.",
  },
];
