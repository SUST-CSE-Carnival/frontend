export async function sendSMS(phoneNumber, message) {
    const api_key = 'huCqtTC4s44wPSkNKI0b'
    const url = ` http://bulksmsbd.net/api/smsapi?api_key=${api_key}&type=text&number=${phoneNumber}&senderid=8809617613117&message=${message}`
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error sending SMS:', error);
      return 'Error sending SMS'
    }
};



export function emailSend(receiver_email, name, message, templateId) {
    let data = {
        service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
        template_id: templateId,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
            'receiver_email': receiver_email,
            'to_name': name,
            'message' : message
        }
    };

    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(data)
      }).then(res => console.log(res))
  }






  async function sendImage(src) {
    const url = 'https://api.openai.com/v1/chat/completions'
    const response = await fetch(url, {
        method : "POST",
        headers : {
          Authorization : `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          'content-type' : 'application/json' 
        },
        body : JSON.stringify({
          model : "gpt-4-vision-preview",
          messages :  [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "What’s in this image?"
                },
                {
                  "type": "image_url",
                  "image_url": {
                    "url": src
                  }
                }
              ]
            }
          ],
          max_tokens : 500
        })        
      })
      
      if (response.ok) {
        let answer = await response.json()
        console.log(answer)
      } else {
        console.error("Failed to send message");
      }
    }  