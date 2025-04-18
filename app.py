from flask import Flask,render_template,request,jsonify
from gmailsender import send_reservation_email

app=Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit-reservation',methods=['POST'])
def submit_reservation():
    data=request.get_json()
    try:
        send_reservation_email(data)
        return jsonify({"message":f"reservation confirmed for data {data['name']} on {data['date']}"}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    

if __name__=="__main__":
    app.run(debug=True)