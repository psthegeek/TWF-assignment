const express = require('express')
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
const translate = require('@vitalets/google-translate-api');
const app = express()

// middleware for parsing JSON bodies
app.use(bodyParser.json())

// POST endpoint for translation

app.post('/translate', async (req,res) => {

    try{
        // Check if request body contains 'text' key
        if(!req.body.text)
            return res.status(400).json({error: "Text to translate is not available."});

        console.log(req.body)
        // Translate text from english to french
        
        const translation = await translate(req.body.text, { to: 'fr' });
        // Send translated text in the response
        return res.json({translation: translation.text});
} catch(error){
    console.error('Translation error', error);
    return res.status(500).json({error: 'Translation Failed. Please try again later. ', details: error.message}, )

}
   
})

app.get('/', (req,res) => {
     res.send("The app is working!!")
})

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

// Note --- This library is not working properly anymore instead of this we can integrate the Google Cloud Translation API. As it requires account so I am not creating one 'cause I don't have visa card. We can import it and then use it;s "Translate function"