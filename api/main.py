from flask import Flask, render_template
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hamidbinameziane'


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

