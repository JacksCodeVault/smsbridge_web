
export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p>We collect information that you provide directly to us when using SMSBridge:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Account information (email, password)</li>
            <li>Device information</li>
            <li>SMS data for processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide and maintain our services</li>
            <li>Process and deliver SMS messages</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information.</p>
        </section>
      </div>
    </div>
  )
}
