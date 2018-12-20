import { db } from '../data/FirebaseDb';

export const addFavorito = (item) => {
    db.app.database().ref(item.uid + '/favoritos/' + item.nome.replace('.', '')).set({        
        nome: item.nome,
        descricao: item.descricao,
        urlLink: item.urlLink,
        img_background: item.img_background,
        img_logo: item.img_logo,
        slug: item.slug,
    })
    .then((result) => {
        console.log(result)
    });
};

export const removeFavorito = (item) => {
    console.log(item);
    db.app.database()
    .ref(item.uid + '/favoritos/' + item.nome.replace('.', ''))
    .remove()
    .then((result) => {
        console.log(result)
    });
};