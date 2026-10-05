from flask import Flask, render_template

app = Flask(__name__)

about_me = {
    "name": "Arsene Matthew. E. N",
    "bio": "'It'd my pleasure to introduce myself. The name's Matthew.'",
    "interests": ["Programming", "Philosopy", "Literature"
                  ],
    "status": "Pilar High School Student",
    "email": "matthew.arsene.en@gmail.com"
}

dear_reading = {
    (11, 1): [
        {
            "title": "An Enquiry Concerning Human Understanding",
            "author": "David Hume",
            "month": "Month 1",
            "image": "dear-hume.jpeg",
            "notes_image": "dear-hume-notes.png",
            "synopsis": "Hume examines how human beings form knowledge. He distinguishes vivid impressions from weaker ideas, questions whether reason can prove cause and effect, and argues that experience and habit strongly shape what we believe.",
            "climax": "The central turning point is Hume's discussion of induction: even if something has happened many times, observation alone cannot guarantee that it will happen again. This leads to his careful, practical form of skepticism.",
            "review": "The book is challenging but valuable because it makes ordinary assumptions feel unfamiliar. Hume's writing encourages the reader to slow down, define ideas precisely, and separate what experience shows from what the mind expects.",
            "insights": "I learned to question the evidence behind my conclusions and to stay intellectually honest when certainty is impossible. It connects strongly to being an open-minded thinker and an inquirer who tests assumptions."
        },
        {
            "title": "1984",
            "author": "George Orwell · Indonesian edition",
            "month": "Month 2",
            "image": "dear-1984.jpeg",
            "notes_image": "dear-1984-notes.png",
            "synopsis": "Winston Smith lives in Oceania, a totalitarian state where the Party controls history, language, information, and private thought. He begins to resist through his diary, his relationship with Julia, and his hope that truth can survive political power.",
            "climax": "The emotional climax comes in the Ministry of Love, especially Room 101. Winston is forced to confront his deepest fear and betrays Julia. When he later accepts the Party's version of reality, the novel shows the complete destruction of his independent identity.",
            "review": "1984 is disturbing because its control is built through ordinary systems: surveillance, propaganda, altered records, restricted language, and fear. The Indonesian translation made the warning feel immediate while preserving the novel's sharp political atmosphere.",
            "insights": "The book made me think about the value of truth, memory, freedom, and language. It connects to being principled and courageous: independent judgment requires protecting evidence, questioning manipulation, and refusing to let fear decide what is real."
        }
    ]
}

@app.route('/')
def home():
    return render_template('index.html', about=about_me)

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/dear/<int:grade>/term/<int:term>')
def dear(grade, term):
    if grade not in (10, 11, 12) or term not in (1, 2, 3, 4):
        return render_template('404.html'), 404
    return render_template('dear.html', grade=grade, term=term, books=dear_reading.get((grade, term), []))

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
    return render_template('grade11_term1.html', dear_books=dear_reading.get((11, 1), []))

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
