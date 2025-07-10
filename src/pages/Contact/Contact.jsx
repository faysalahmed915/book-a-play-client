import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { Link } from 'react-router'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // TODO: Integrate with email service or backend
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Contact | BookaPlay</title>
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:divide-x md:divide-base-300">
                {/* Contact Info */}
                <div className="py-8 md:pr-8 space-y-5">
                    <h1 className="text-4xl font-bold text-primary">Get in touch</h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        We’d love to hear from you. Here’s how you can reach us.
                    </p>

                    <div className="space-y-4">
                        <p className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Dhaka, Bangladesh
                        </p>

                        <p className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            +880 1234-567890
                        </p>

                        <p className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            support@bookaplay.com
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex flex-col py-8 md:pl-8 space-y-6 bg-base-200 p-6 rounded-lg shadow-md"
                >
                    <h2 className="text-3xl font-bold text-primary mb-2">Let Us Know</h2>

                    <label className="form-control">
                        <span className="label-text mb-1">Full Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="input input-bordered w-full"
                        />
                    </label>

                    <label className="form-control">
                        <span className="label-text mb-1">Email Address</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                            className="input input-bordered w-full"
                        />
                    </label>

                    <label className="form-control">
                        <span className="label-text mb-1">Message</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            rows="4"
                            required
                            className="textarea textarea-bordered w-full"
                        />
                    </label>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary px-8 w-full md:w-auto">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Additional Contact Options */}
            <div className="mt-16 border-t border-base-300 pt-10 text-center">
                <h3 className="text-2xl font-semibold text-primary mb-4">Other Ways to Connect</h3>
                <p className="text-base-content max-w-xl mx-auto mb-6">
                    Whether you need help with a booking, want to partner with us, or just want to say hello — we’re available across multiple channels.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                    >
                        Twitter/X
                    </a>
                    <Link
                        to="/"
                        className="btn btn-outline btn-sm"
                    >
                        Visit FAQ
                    </Link>
                    <Link
                        to="/"
                        className="btn btn-outline btn-sm"
                    >
                        Help Center
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default Contact
