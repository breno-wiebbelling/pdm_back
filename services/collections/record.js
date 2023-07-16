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
    console.log(updated_record);

    return updated_record['_id'];
}

const findById = async (record_id, user_id) => {

    await db.verifyConection();
    await Record.find({ _id:record_id, id_creator:user_id })
}

const findByMonthAndYear = async (month, year, user_id) => {
    console.log(month);
    console.log(year);
    
    let gte = `${year}-${month}-01`
    let lte = `${year}-${ (month == 12) ? 12 : parseInt(month)+1 }-01`
    await db.verifyConection();

    return Record.find({
        id_creator:user_id,
        date: {
            $gte: gte,
            $lte: lte
        }
    })
}

const deleteRecord = async ( record_id, user_id ) => {
    await db.verifyConection();
    return Record.deleteOne({
        _id: record_id,
        id_creator: user_id
    })
}

module.exports = {create, update, findByMonthAndYear, findById, deleteRecord}