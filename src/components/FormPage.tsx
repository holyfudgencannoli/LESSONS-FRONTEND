import React, { useState } from 'react';
import './FormPage.css';

interface LessonFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  licenseNumber: string;
  licenseImage: File | null;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<LessonFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    licenseNumber: '',
    licenseImage: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG or PNG).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB.');
        return;
      }
      setFormData((prev) => ({ ...prev, licenseImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.licenseImage) {
      alert('Please upload your driver’s license image.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('address', formData.address);
      data.append('licenseNumber', formData.licenseNumber);
      data.append('licenseImage', formData.licenseImage);

      // 🔥 Change this URL to your actual backend endpoint
      const response = await fetch('https://lessons-backend-36hi.onrender.com/api/lessons', {
        method: 'POST',
        body: data,
      });

    //   if (!response.ok) throw new Error('Failed to submit form');

      setStatus('success');
      setMessage('✅ Form submitted successfully! We’ll contact you soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        licenseNumber: '',
        licenseImage: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('❌ Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="lesson-form-container">
      <h1>Lesson Registration</h1>
      <p>Please fill out the form below to request your driving lesson.</p>

      <form onSubmit={handleSubmit} className="lesson-form">
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Driver’s License Number
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Driver’s License Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        {preview && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={preview} alt="Driver's License preview" />
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && <p className={`form-message ${status}`}>{message}</p>}
    </div>
  );
};

export default FormPage;

