import { motion } from 'motion/react';
import { HelpCircle, MessageCircle, Book, Video, Mail, Phone, Search, ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const faqs = [
  {
    question: 'How do I add a new property to my dashboard?',
    answer: 'Go to Settings > Properties and click "Add Property". Follow the setup wizard to connect your data sources.'
  },
  {
    question: 'Can I export my reports?',
    answer: 'Yes! Click the "Export" button in the header on any page to download reports in PDF or Excel format.'
  },
  {
    question: 'How often is the data updated?',
    answer: 'Data is refreshed in real-time for most sources. Some integrations sync every 15-30 minutes.'
  },
  {
    question: 'Can I customize the dashboard layout?',
    answer: 'Yes, you can customize widgets and metrics from the Settings page under Dashboard Preferences.'
  }
];

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of Views Analytics',
    icon: Book,
    color: 'indigo'
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: Video,
    color: 'purple'
  },
  {
    title: 'API Documentation',
    description: 'Integrate with our API',
    icon: Book,
    color: 'cyan'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users',
    icon: MessageCircle,
    color: 'green'
  }
];

export function HelpSupportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Help & Support</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Get help and find answers to your questions
        </p>
      </div>

      {/* Search Help */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for help articles, guides, and FAQs..."
            className="pl-12 h-12"
          />
        </div>
      </Card>

      {/* Quick Contact */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Live Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get instant help from our team
              </p>
            </div>
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            Start Chat
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
              <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                support@viewsanalytics.com
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Send Email
          </Button>
        </Card>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-gray-900 dark:text-white mb-4">Popular Resources</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className={`p-3 rounded-lg bg-${resource.color}-100 dark:bg-${resource.color}-900/20 w-fit mb-4`}>
                <resource.icon className={`w-6 h-6 text-${resource.color}-600 dark:text-${resource.color}-400`} />
              </div>
              <h4 className="text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {resource.description}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-indigo-600 dark:text-indigo-400">
                Learn more
                <ExternalLink className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Quick answers to common questions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h4 className="text-gray-900 dark:text-white mb-2">{faq.question}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          View All FAQs
        </Button>
      </Card>

      {/* Contact Form */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-6">Send us a message</h3>
        
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue or question..."
              rows={6}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              Send Message
            </Button>
          </div>
        </form>
      </Card>

      {/* Contact Info */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Other ways to reach us</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white">+966 50 123 4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <MessageCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
              <p className="text-gray-900 dark:text-white">+966 50 123 4567</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
