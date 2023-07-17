const Record = require('../../db/Collections/Record');
const db = require('../../db/db');

const create = async ( new_record ) => {
    console.log(`Starting record creation`)

    await Record.validate(new_record);
    await db.verifyConection();
    let saved_record = await Record.create(new_record);

    console.log(`Completed record creation\n`);
    return saved_record["_id"];
}

const update = async ( user_id, newRec ) => {
    console.log(`Starting record update`)

    await Record.validate(newRec);
    await db.verifyConection();

    let updated_record = await Record.findOneAndUpdate({ _id:newRec['_id'], id_creator:user_id }, newRec)

    return updated_record['_id'];
}

const findByMonthAndYear = async (month, year, user_id) => {
    
    let from = `${year}-${ (month == 12) ? 12 : parseInt(month) }-01`
    let until = `${ (month == 12) ? parseInt(year)+1 : year }-${ (month == 12) ? 1 : parseInt(month)+1 }-01`
    await db.verifyConection();

    return Record.find({
        id_creator:user_id,
        date: {
            $gte: from,
            $lte: until
        }
    });
}

const deleteRecord = async ( record_id, user_id ) => {
    await db.verifyConection();
    return Record.deleteOne({
        _id: record_id,
        id_creator: user_id
    })
}

module.exports = {create, update, findByMonthAndYear, deleteRecord}