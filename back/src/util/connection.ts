import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db-test.json');
const connection = lowdb(adapter);

connection
    .defaults({
        entrances: {},
        exits: {},
        ignoreList: [],
        sounds: []
    })
    .write();

export function getAllSounds(){
    return connection.get("sounds");
}

export default connection;
