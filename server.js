import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult} from 'express-validator';
import cors from 'cors';

const app = express();

connectDatabase();

app.use(express.json({ extended: false}));
app.use(cors({ orgin:'http://localhost300' }));

// API endpoints
/** 
* @route GET/
* @desc Test endpoint
*/


app.get('/',(req, res) =>
    res.send('http get request sent to root api endpoint')
);

// API endpoints
/** 
* @route POST api/users
* @desc Register user
*/

app.post('/api/users', 
    [
        check('name', 'Please enter your name please').not().isEmpty(),
        check('email', 'Enter a valid email please').isEmail(),
        check('password', 'Please enter a password ').isLength({min:6})
    ],
    
    
    
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array() });
    } else {
        return res.send(req.body);
    }

}
);
const port = 3000;
app.listen(port, () => console.log(`Express server running on port port ${port}`));