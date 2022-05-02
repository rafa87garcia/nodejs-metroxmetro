const mongoose = require('mongoose');
const db = require('../db');
const Property = require('../Models/Property');


const properties = [
  {
    title: 'Propiedad 1',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2005,
    status: 'new',
  },
  {
    title: 'Propiedad 2',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2000,
    status: 'new',
  },
  {
    title: 'Propiedad 2',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2000,
    status: 'new',
  },
  {
    title: 'Propiedad 2',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2000,
    status: 'new',
  },
  {
    title: 'Propiedad 2',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2000,
    status: 'new',
  },
  {
    title: 'Propiedad 2',
    description: 'dasdasdasd',
    type: 'local',
    address: 'c/dasdasdas',
    lat: 423423423,
    log: 4234234234,
    yearBuild: 2000,
    status: 'new',
  },

];

const PropertiesDocument = properties.map(item => new Property(item));

db.connectDB
  .then(async () => {
    const allProperties = await Property.find();

    if (allProperties.length > 0) {
      await Property.collection.drop();
    }
  })
  .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
  .then(async () => {
    await Property.insertMany(PropertiesDocument);
  })
  .catch(err => console.error(`Error creando documentos en DB: ${err}`))
  .finally(() => mongoose.disconnect())