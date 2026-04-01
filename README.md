# Setup before running project
WHATSAPP_TOKEN is a Permanent Access Token that you need to get from Meta (Facebook) to use the WhatsApp Business API. It's used to authenticate your requests to send messages.

Here's how you can obtain it:

Go to the Meta for Developers Portal: Log in to your Meta for Developers account and go to your App Dashboard.

Select Your App: Choose the app that you've configured for WhatsApp Business. If you haven't created one, you'll need to do that first.

Navigate to the WhatsApp Section: In the left-hand menu, go to App Dashboard > Products > WhatsApp > Getting Started.

Get Your Permanent Access Token:

For development, you can use the temporary access token provided on this page. However, it expires in 24 hours.
For a production environment, you need to generate a permanent token. You can do this by navigating to the Users and Permissions section of the Business Manager and creating a System User with the whatsapp_business_messaging permission for your app. Then, you can generate a non-expiring token for that system user.
Get Your Phone Number ID: On the same Getting Started page, you will also find the Phone Number ID. You'll need this for the PHONE_NUMBER_ID environment variable that is used in the code.

Once you have both the WHATSAPP_TOKEN and the PHONE_NUMBER_ID, you should add them to your .env file.

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```