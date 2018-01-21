import { MongoClient, ObjectId } from 'mongodb';

MongoClient.connect('mongodb://mongo:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb', err);
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    /*
        CREATE
    */

    // create a todo:
    // db.collection('Todo').insertOne({
    //     text: 'Something to do',
    //     complete: false
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // })

    // create a user
    // db.collection('Users').insertOne({
    //     name: 'Andrew',
    //     age: 30,
    //     location: 'San Diego'
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    /*
        READ
    */

    // find users with name of Brittany
    // db.collection('Users').find({name: 'Brittany'}).toArray().then((doc) => {
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // });

    // Count todo's:
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(count);
    // }, (err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // });

    /*
        DELETE
    */

    // deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat Lunch'}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat Lunch' }).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false }).then((result) => {
    //     console.log(result);
    // })

    // challenge:
    // delete many that == name: 'Andrew'
    // db.collection('User').deleteMany({ name: 'Andrew'}).then((res) => {
    //     console.log(res);
    // })

    // find one and delete:
    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectId('hashed_id')
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // });

    /*
        UPDATE:
    */

    // findOneAndUpdate:
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId('hashed_id')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectId('sjdklfjsdlkf')
    // }, {
    //     $set: {
    //         name: 'Andrew'
    //     },
    //     $inc: {
    //         age: 1
    //     }
    // }, {
    //     returnOriginal: false
    // }).then(res => console.log(res));

    client.close();
});