# EmailJS Setup Guide for G8 Studio

This guide will walk you through setting up EmailJS to receive contact form submissions with a professional, branded email template.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"** (recommended) or your preferred email provider
4. Click **"Connect Account"** and authorize EmailJS to send emails on your behalf
5. **Important**: Set the recipient email to your desired email address.
6. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. **Template Name**: `g8_studio_contact_form`
4. **Mapping the Fields**:
   EmailJS uses double curly braces `{{ }}` to map data from the website to your email. In the template editor, you will use these exact variable names:
   - `{{from_name}}`: Displays the client's name.
   - `{{from_email}}`: Displays the client's email address.
   - `{{phone}}`: Displays the client's phone number.
   - `{{message}}`: Displays the client's actual message.
   - `{{to_email}}`: This is where the email is sent.

5. **Set the Subject**:
   In the "Settings" tab of your template, set the **Subject** to:
   `New Inquiry: {{from_name}} | G8 Studio`

6. **Copy/Paste the HTML**:
   Switch to the **"Source"** (or HTML) mode in the EmailJS editor and paste the responsive template from [`src/templates/contact-email.html`](../src/templates/contact-email.html).

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy it (you'll need this for the .env file)

## Step 5: Configure Environment Variables

1. Open your `.env` file in the project root
2. Add the following variables with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. **Replace** the placeholder values with:
   - `VITE_EMAILJS_SERVICE_ID`: The Service ID from Step 2
   - `VITE_EMAILJS_TEMPLATE_ID`: The Template ID from Step 3
   - `VITE_EMAILJS_PUBLIC_KEY`: The Public Key from Step 4

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact page
3. Fill out the form with test data
4. Submit the form
5. Check your email for the message

## Troubleshooting

### Email not received or API Error?
- **Error: "Gmail_API: Request had insufficient authentication scopes"**
  - This is a common Google security requirement.
  - **Fix**: Go to EmailJS Dashboard → **Email Services**.
  - Click on your Gmail service and click **"Reconnect"** or **"Edit"**.
  - When the Google login popup appears, you **MUST** check the box that says: **"Send email on your behalf"**.
  - Without this checkmark, Google blocks EmailJS from sending the message.
- Check your EmailJS dashboard for failed sends.
- Verify all environment variables in `.env` are correct.
- Check spam folder.

### Template variables not showing?
- Make sure you're using the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`
- These must match the `templateParams` in `src/services/email.ts`

### Rate limiting?
- EmailJS free tier allows 200 emails/month
- For production, consider upgrading to a paid plan
