import React, { useState } from 'react';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    message: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Architect",
      department: "Design",
      location: "Hyderabad",
      type: "Full-time",
      experience: "5-8 years",
      description: "Looking for an experienced architect to lead design projects for residential and commercial developments.",
      requirements: ["Bachelor's degree in Architecture", "5+ years experience", "Proficiency in AutoCAD, Revit", "Strong design portfolio"]
    },
    {
      id: 2,
      title: "Civil Engineer",
      department: "Construction",
      location: "Hyderabad",
      type: "Full-time",
      experience: "3-5 years",
      description: "Seeking a civil engineer to oversee construction projects and ensure quality standards.",
      requirements: ["B.Tech in Civil Engineering", "3+ years site experience", "Knowledge of construction management", "Strong problem-solving skills"]
    },
    {
      id: 3,
      title: "Sales Manager",
      department: "Sales & Marketing",
      location: "Hyderabad",
      type: "Full-time",
      experience: "4-6 years",
      description: "Dynamic sales professional to drive property sales and manage client relationships.",
      requirements: ["MBA/Graduate degree", "4+ years in real estate sales", "Excellent communication skills", "Proven sales track record"]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', position: '', experience: '', resume: null, message: '' });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">Careers at Tanavi</h1>
          <p className="text-xl">Join Our Team and Build Your Future</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Work With Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Tanavi Properties, we believe our employees are our greatest asset. We offer a dynamic work environment, 
            competitive compensation, and opportunities for professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Career Growth</h3>
            <p className="text-gray-600">Continuous learning opportunities and clear career progression paths</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Competitive Pay</h3>
            <p className="text-gray-600">Industry-leading salaries and performance-based incentives</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3">Great Culture</h3>
            <p className="text-gray-600">Collaborative environment with work-life balance</p>
          </div>
        </div>

        {jobOpenings.length > 0 ? (
          <>
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-12">Current Openings</h2>
              <div className="space-y-6">
                {jobOpenings.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>📍 {job.location}</span>
                          <span>💼 {job.type}</span>
                          <span>⏱️ {job.experience}</span>
                        </div>
                      </div>
                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Apply Now</h2>
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Position *</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="experience"
                  placeholder="Years of Experience *"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div>
                  <label className="block text-gray-700 mb-2">Upload Resume (PDF) *</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Cover Letter / Additional Information"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Career Enquiry</h2>
            <p className="text-center text-gray-600 mb-8">
              Currently, we don't have any open positions. However, we're always looking for talented individuals. 
              Please submit your details and we'll contact you when suitable opportunities arise.
            </p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="position"
                placeholder="Interested Position *"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience *"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div>
                <label className="block text-gray-700 mb-2">Upload Resume (PDF) *</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us about yourself *"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
