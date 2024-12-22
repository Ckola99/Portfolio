import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import chevron from '../assets/chevron.png';
import chevronDown from '../assets/chevron-down.png';
import vector from '../assets/Vector.png';
import emailjs from '@emailjs/browser';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const Contact = () => {
  const [openFolders, setOpenFolders] = useState({
    contacts: false,
    'find-me-also-on': false,
  });
  const [formStatus, setFormStatus] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleFolder = (folder) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folder]: !prevState[folder],
    }));
  };

  const contacts = ['Email: Christopherkola@gmail.com', 'Phone: +27790128237'];
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ckola99' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/christopher-k-b64b35119/' },
    { name: 'Twitter', url: 'https://x.com/koladev01?s=21' },
    { name: 'Frontend Mentor', url: 'https://www.frontendmentor.io/profile/Ckola99' },
  ];

  const onSubmit = (data) => {
    const serviceId = 'service_utvvp0e';
    const templateId = 'template_yz0my88';
    const publicKey = '1nqIE1hx36MObctJ9';

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'Christopher Kola',
      message: data.message
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setFormStatus('Message sent successfully!');
        reset();
      })
      .catch((error) => {
        setFormStatus('Failed to send message, Please try again')
        console.error('EmailJS Error:', error)
      })
  };


  return (
    <div className="w-full">
      <h1 className="text-white p-5">_contact-me</h1>
      <div className="flex flex-col gap-1">
        {/* Contacts Section */}
        <button
          onClick={() => toggleFolder('contacts')}
          className="flex items-center bg-line-color pl-5 gap-3 text-white w-full h-[31px]"
        >
          <img
            src={openFolders.contacts ? chevronDown : chevron}
            alt="chevron"
            className="h-[8.5px] w-[8px]"
          />
          contacts
        </button>
        {openFolders.contacts && (
          <ul className="text-light-gray text-[14px] px-5 pt-2">
            {contacts.map((contact, index) => (
              <li key={index} className="py-1">
                {contact}
              </li>
            ))}
          </ul>
        )}

        {/* Find Me Also On Section */}
        <button
          onClick={() => toggleFolder('find-me-also-on')}
          className="flex items-center bg-line-color pl-5 gap-3 text-white w-full h-[31px]"
        >
          <img
            src={openFolders['find-me-also-on'] ? chevronDown : chevron}
            alt="chevron"
            className="h-[8.5px] w-[8px]"
          />
          find-me-also-on
        </button>
        {openFolders['find-me-also-on'] && (
          <ul className="text-light-gray text-[14px] px-5 pt-2">
            {socialLinks.map((link, index) => (
              <li key={index} className="py-1">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center hover:underline"
                >
                  <img src={vector} alt="link" className="w-3 h-3" /> {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Contact Form */}
      <form className="px-5 py-8 text-light-gray" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm mb-2">
            _name:
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full p-2 bg-navy-blue text-white border border-line-color rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            _email:
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full p-2 bg-navy-blue text-white border border-line-color rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm mb-2">
            _message:
          </label>
          <textarea
            id="message"
            {...register('message')}
            className="w-full p-2 bg-navy-blue text-white border border-line-color rounded-lg"
            rows="5"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cta-default"
        >
          submit-message
        </button>
        {formStatus && <p className="mt-4 text-sm">{formStatus}</p>}
      </form>
    </div>
  );
};

export default Contact;
