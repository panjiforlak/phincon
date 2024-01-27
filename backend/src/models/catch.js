const {Model, DataTypes}= require('sequelize')
const sequelize = require('../config/database')

class Catches extends Model{}

Catches.init({
    id_pokemon:{
        type: DataTypes.INTEGER,
    },
    same:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    
    alias:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    url:{
        type: DataTypes.STRING
    },
    img:{
        type: DataTypes.STRING
    },
    base:{
        type: DataTypes.INTEGER
    },

},{
    sequelize,
    modelName: 'catches'
})
module.exports=Catches