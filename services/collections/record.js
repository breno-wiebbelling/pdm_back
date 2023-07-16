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

const update = async ( user_id, rec_id, newRec ) => {
    await db.verifyConection();
    return await Record.findOneAndUpdate({ _id:rec_id, id_creator:user_id }, newRec)
}

const findById = async (record_id, user_id) => {

    await db.verifyConection();
    await Record.find({ _id:record_id, id_creator:user_id })
}

const findByMonthAndYear = async (month, year, user_id) => {

    await db.verifyConection();
    return Record.find({
        id_creator:user_id,
        date: {
            $gte: `${year}-${month}-01`,
            $lte: `${year}-${parseInt(month)+1}-01`
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