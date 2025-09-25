from flask import Flask, render_template

app = Flask(__name__)

about_me = {
    "name": "Arsene Matthew. E. N",
    "bio": "Hello! I'm Matthew.",
    "interests": ["Programming", "Chess", "Philosophy", "Thinking"],
    "status": "Pilar High School Student",
    "email": "matthew.arsene.en@gmail.com"
}

@app.route('/')
def home():
    return render_template('index.html', about=about_me)

@app.route('/grade/10/term/1')
def grade10_term1():
    return render_template('grade10_term1.html')

@app.route('/grade/10/term/2')
def grade10_term2():
    return render_template('grade10_term2.html')

@app.route('/grade/10/term/3')
def grade10_term3():
    return render_template('grade10_term3.html')

@app.route('/grade/10/term/4')
def grade10_term4():
    return render_template('grade10_term4.html')

@app.route('/grade/11/term/1')
def grade11_term1():
    return render_template('grade11_term1.html')

@app.route('/grade/11/term/2')
def grade11_term2():
    return render_template('grade11_term2.html')

@app.route('/grade/11/term/3')
def grade11_term3():
    return render_template('grade11_term3.html')

@app.route('/grade/11/term/4')
def grade11_term4():
    return render_template('grade11_term4.html')

@app.route('/grade/12/term/1')
def grade12_term1():
    return render_template('grade12_term1.html')

@app.route('/grade/12/term/2')
def grade12_term2():
    return render_template('grade12_term2.html')

@app.route('/grade/12/term/3')
def grade12_term3():
    return render_template('grade12_term3.html')

@app.route('/grade/12/term/4')
def grade12_term4():
    return render_template('grade12_term4.html')

if __name__ == '__main__':
    app.run(debug=True)