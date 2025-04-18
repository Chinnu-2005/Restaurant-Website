from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os
import pickle
import base64
from email.mime.text import MIMEText


SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def send_reservation_email(data):
    creds=None
    if os.path.exists("token.pickle"):
            with open("token.pickle", "rb") as token:
                creds = pickle.load(token)
    if not creds or not creds.valid:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

            with open("token.pickle", "wb") as token:
                pickle.dump(creds, token)
    service=build("gmail", "v1", credentials=creds)
    message_text=f'''
         Hi {data['name']},

    Your reservation at our restaurant is confirmed.

    📅 Date: {data['date']}
    🕒 Time: {data['time']}
    👥 Guests: {data['guests']}
    💬 Special Requests: {data['specialRequests']}

    Thank you for booking with us!

    Regards,
    Restaurant Team
    '''
    message=MIMEText(message_text)
    message['to'] = data['email']
    message['from'] = "me"
    message['subject'] = "Restaurant Reservation Confirmation"

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    body = {'raw': raw}
    service.users().messages().send(userId="me", body=body).execute()