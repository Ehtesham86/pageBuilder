import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Star } from 'lucide-react'

interface TemplatesModalProps {
  isOpen: boolean
  onClose: () => void
  onInsertTemplate: (template: any) => void
}

const templates = [
  {
    id: 1,
    name: "Digital Marketing Squeeze Page",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        .dm-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .dm-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          animation: slideIn 1s ease-out;
        }
        .dm-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
          animation: slideIn 1s ease-out 0.5s both;
        }
        .dm-form {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 1s both;
          width: 100%;
          max-width: 500px;
        }
        .dm-form input, .dm-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: none;
          border-radius: 5px;
        }
        .dm-form button {
          background-color: #fbbf24;
          color: #4a5568;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .dm-form button:hover {
          background-color: #f59e0b;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: white;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="dm-container">
        <h1>Boost Your Digital Presence Today!</h1>
        <p>Get our free guide on mastering social media marketing and skyrocket your online engagement.</p>
        <form class="dm-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="digital_marketing" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="What's your biggest marketing challenge?"></textarea>
          <button type="submit">Get Free Guide</button>
        </form>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-white">
          &copy; 2023 Digital Marketing Co. All rights reserved.
        </footer>
      </div>
    `
  },
  {
    id: 2,
    name: "Real Estate Squeeze Page",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); }
          to { transform: translateX(0); }
        }
        .re-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Georgia', serif;
          background: linear-gradient(135deg, #d4e4ef 0%, #86a8e7 100%);
          color: #2c3e50;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .re-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          animation: slideIn 1s ease-out;
        }
        .re-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
          animation: slideIn 1s ease-out 0.5s both;
        }
        .re-form {
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 1s both;
          width: 100%;
          max-width: 500px;
        }
        .re-form input, .re-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
        }
        .re-form button {
          background-color: #3498db;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .re-form button:hover {
          background-color: #2980b9;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: #2c3e50;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="re-container">
        <h1>Find Your Dream Home Today!</h1>
        <p>Get instant access to our exclusive list of premium properties in your desired area.</p>
        <form class="re-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="real_estate" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="What's your ideal home like?"></textarea>
          <button type="submit">Get Property List</button>
        </form>
        <div class="social-icons">
          <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
          <a href="#" aria-label="Linkedin"><Linkedin size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-gray-600">
          &copy; 2023 Real Estate Experts. All rights reserved.
        </footer>
      </div>
    `
  },
  {
    id: 3,
    name: "E-commerce Squeeze Page",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .ec-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Helvetica', sans-serif;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .ec-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }
        .ec-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
        }
        .ec-form {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 0.5s both;
          width: 100%;
          max-width: 500px;
        }
        .ec-form input, .ec-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: none;
          border-radius: 5px;
        }
        .ec-form button {
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .ec-form button:hover {
          background-color: #27ae60;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: white;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="ec-container">
        <h1>Exclusive 50% Off Your First Purchase!</h1>
        <p>Sign up now to receive your discount code and be the first to know about our latest products.</p>
        <form class="ec-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="ecommerce" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="What products are you interested in?"></textarea>
          <button type="submit">Get My 50% Off</button>
        </form>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-white">
          &copy; 2023 E-commerce Store. All rights reserved.
        </footer>
      </div>
    `
  },
  {
    id: 4,
    name: "Restaurant Squeeze Page",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .rest-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Courier New', monospace;
          background: linear-gradient(135deg, #fad961 0%, #f76b1c 100%);
          color: #2c3e50;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .rest-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }
        .rest-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
        }
        .rest-form {
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 0.5s both;
          width: 100%;
          max-width: 500px;
        }
        .rest-form input, .rest-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #e67e22;
          border-radius: 5px;
        }
        .rest-form button {
          background-color: #e74c3c;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .rest-form button:hover {
          background-color: #c0392b;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: #2c3e50;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="rest-container">
        <h1>Taste the Difference: 20% Off Your First Meal!</h1>
        <p>Join our VIP list for exclusive offers, new menu alerts, and a special discount on your next visit.</p>
        <form class="rest-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="restaurant" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Any dietary preferences or allergies?"></textarea>
          <button type="submit">Claim My 20% Off</button>
        </form>
        <div class="social-icons">
          <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
          <a href="#" aria-label="Youtube"><Youtube size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-gray-700">
          &copy; 2023 Gourmet Restaurant. All rights reserved.
        </footer>
      </div>
    `
  },
  {
    id: 5,
    name: "SEO Landing Page",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .seo-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .seo-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          animation: slideInLeft 1s ease-out;
        }
        .seo-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
          animation: slideInLeft 1s ease-out 0.3s both;
        }
        .seo-form {
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 0.6s both;
          width: 100%;
          max-width: 500px;
        }
        .seo-form input, .seo-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ff8c00;
          border-radius: 5px;
          color: #333;
        }
        .seo-form button {
          background-color: #ff4500;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .seo-form button:hover {
          background-color: #ff6347;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: white;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        .features, .services, .testimonials {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        .feature, .service, .testimonial {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 10px;
          flex-basis: calc(33.333% - 20px);
          animation: fadeIn 1s ease-out 0.9s both;
        }
        .testimonial {
          text-align: left;
          font-style: italic;
        }
        .feature h3 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 40px;
        }
        @media (max-width: 768px) {
          .feature, .service, .testimonial {
            flex-basis: calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .feature, .service, .testimonial {
            flex-basis: 100%;
          }
        }
      </style>
      <div class="seo-container">
        <h1>Boost Your Website's Visibility with Our SEO Services</h1>
        <p>Unlock the power of search engine optimization and drive more organic traffic to your website.</p>
        <form class="seo-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="seo_services" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="url" name="website" placeholder="Your Website URL" required />
          <textarea name="message" placeholder="What are your SEO goals?"></textarea>
          <button type="submit">Get Free SEO Audit</button>
        </form>
        <div class="features">
          <div class="feature">
            <h3>Keyword Optimization</h3>
            <p>Target the right keywords to attract your ideal audience.</p>
          </div>
          <div class="feature">
            <h3>On-Page SEO</h3>
            <p>Optimize your website's structure and content for better rankings.</p>
          </div>
          <div class="feature">
            <h3>Link Building</h3>
            <p>Increase your site's authority with high-quality backlinks.</p>
          </div>
        </div>
        <h2>Our Services</h2>
        <div class="services">
          <div class="service">
            <h3>Technical SEO Audit</h3>
            <p>Comprehensive analysis of your website's technical aspects affecting SEO.</p>
          </div>
          <div class="service">
            <h3>Content Optimization</h3>
            <p>Enhance your content to align with search intent and boost rankings.</p>
          </div>
          <div class="service">
            <h3>Local SEO</h3>
            <p>Improve your visibility in local search results and Google Maps.</p>
          </div>
        </div>
        <h2>What Our Clients Say</h2>
        <div class="testimonials">
          <div class="testimonial">
            <p>"Their SEO strategies doubled our organic traffic in just 3 months!"</p>
            <p>- John D., E-commerce Owner</p>
          </div>
          <div class="testimonial">
            <p>"We're now ranking #1 for our main keywords thanks to their expertise."</p>
            <p>- Sarah L., Marketing Manager</p>
          </div>
          <div class="testimonial">
            <p>"The ROI on their SEO services has been phenomenal. Highly recommended!"</p>
            <p>- Mike R., Small Business Owner</p>
          </div>
        </div>
        <div class="social-icons">
          <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
          <a href="#" aria-label="Linkedin"><Linkedin size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-white">
          &copy; 2023 SEO Experts. All rights reserved.
        </footer>
      </div>
    `
  },
  {
    id: 6,
    name: "Software Launch Announcement",
    content: `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .launch-container {
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Helvetica', sans-serif;
          background: linear-gradient(135deg, #1a1a1a 0%, #434343 100%);
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-out;
        }
        .launch-container h1 {
          font-size: 2.8em;
          margin-bottom: 20px;
          animation: slideInRight 1s ease-out;
          color: #00ffff;
        }
        .launch-container p {
          font-size: 1.2em;
          margin-bottom: 30px;
          animation: slideInRight 1s ease-out 0.3s both;
        }
        .launch-form {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          animation: fadeIn 1s ease-out 0.6s both;
          width: 100%;
          max-width: 500px;
        }
        .launch-form input, .launch-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #00ffff;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.3);
          color: white;
        }
        .launch-form button {
          background-color: #00ffff;
          color: #1a1a1a;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-weight: bold;
        }
        .launch-form button:hover {
          background-color: #00cccc;
        }
        .social-icons {
          margin-top: 20px;
        }
        .social-icons a {
          color: #00ffff;
          font-size: 24px;
          margin: 0 10px;
          text-decoration: none;
        }
        .features, .testimonials {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        .feature, .testimonial {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 10px;
          flex-basis: calc(33.333% - 20px);
          animation: fadeIn 1s ease-out 0.9s both;
        }
        .testimonial {
          text-align: left;
        }
        .feature h3 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        .countdown {
          font-size: 2em;
          margin: 20px 0;
          color: #00ffff;
        }
        .rating {
          color: #00ffff;
          font-size: 1.2em;
          margin-top: 10px;
        }
        footer {
          width: 100%;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 40px;
        }
        @media (max-width: 768px) {
          .feature, .testimonial {
            flex-basis: calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .feature, .testimonial {
            flex-basis: 100%;
          }
        }
      </style>
      <div class="launch-container">
        <h1>Introducing RevolutionAI</h1>
        <p>The next generation AI-powered productivity suite that will transform the way you work.</p>
        <div class="countdown" id="countdown">Launch in: 00:00:00</div>
        <form class="launch-form" action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
          <input type="hidden" name="campaign" value="software_launch" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="How would AI boost your productivity?"></textarea>
          <button type="submit">Get Early Access</button>
        </form>
        <h2>Features of RevolutionAI</h2>
        <div class="features">
          <div class="feature">
            <h3>Smart Automation</h3>
            <p>Automate repetitive tasks with AI-powered workflows, saving you hours every week.</p>
          </div>
          <div class="feature">
            <h3>Predictive Analytics</h3>
            <p>Make data-driven decisions with advanced AI insights and forecasting capabilities.</p>
          </div>
          <div class="feature">
            <h3>Natural Language Processing</h3>
            <p>Communicate with your AI assistant using natural language for seamless interaction.</p>
          </div>
          <div class="feature">
            <h3>Cross-Platform Sync</h3>
            <p>Access your work from anywhere, with real-time synchronization across all your devices.</p>
          </div>
          <div class="feature">
            <h3>Customizable Workflows</h3>
            <p>Tailor the AI to your specific needs with easy-to-use customization tools.</p>
          </div>
          <div class="feature">
            <h3>Advanced Security</h3>
            <p>Enterprise-grade security measures to keep your data safe and compliant.</p>
          </div>
        </div>
        <h2>What Early Adopters Are Saying</h2>
        <div class="testimonials">
          <div class="testimonial">
            <p>"RevolutionAI has completely transformed our workflow. It's like having a super-intelligent assistant at your fingertips."</p>
            <p>- Emily S., Project Manager</p>
            <div class="rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
          <div class="testimonial">
            <p>"The predictive analytics feature has given us invaluable insights, helping us stay ahead of market trends."</p>
            <p>- Alex K., Business Analyst</p>
            <div class="rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
          <div class="testimonial">
            <p>"The natural language processing is incredibly intuitive. It's like the AI can read my mind!"</p>
            <p>- Michael R., Content Creator</p>
            <div class="rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00ffff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
        </div>
        <div class="social-icons">
          <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
          <a href="#" aria-label="Linkedin"><Linkedin size={24} /></a>
        </div>
        <footer class="mt-8 text-sm text-gray-400">
          &copy; 2023 RevolutionAI. All rights reserved.
        </footer>
      </div>
      <script>
        // Countdown timer
        const countdownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
        const countdownElement = document.getElementById('countdown');

        const countdownTimer = setInterval(function() {
          const now = new Date().getTime();
          const distance = countdownDate - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownElement.innerHTML = 'Launch in: ' + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

          if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "LAUNCHED!";
          }
        }, 1000);
      </script>
    `
  }
]

const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose, onInsertTemplate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Squeeze Page Templates</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <div className="mb-4 h-[400px] overflow-y-auto border p-2 rounded">
                <div dangerouslySetInnerHTML={{ __html: template.content }} />
              </div>
              <Button onClick={() => onInsertTemplate(template)}>Insert</Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TemplatesModal

