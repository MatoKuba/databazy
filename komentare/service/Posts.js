import * as Db from "./MariaClient.js";

/**
 * Pridat hodnotenie pre prispevok.
 * @param postId
 */
async function  addLike(postId) {
    // aktualizacia hodnoty v databaze
    await Db.query('UPDATE posts SET rating = rating + 1 WHERE id = :postId', {postId: postId});

    // nacitanie novej hodnoty
    let dbRes = await Db.query('SELECT rating FROM posts WHERE id = :postId', {postId: postId});

    // vyber hodnoty z vysledku DB volania
    return dbRes.pop().rating;
}

/**
 * Vlozit novy prispevok
 *
 * @param userId
 * @param message
 * @returns {Promise<*>}
 */
async function addPost(meno, message, id) {
    await Db.query(
        'INSERT INTO posts (meno, created_at, message , id_pod) VALUES (:userId, now(), :message, :id)',
        {userId: meno, message: message, id: id}
    );
}

/**
 * Vymazat prispevok
 *
 * @param postId
 * @returns {Promise<*>}
 */
async function deletePost(postId) {
    await Db.query(
        'DELETE FROM posts WHERE id = :postId',
        {postId: postId}
    );
}
async function getEventID(postId) {
    return  Db.query(
        'SELECT id_pod from posts where id = :postId',
        {postId: postId}
    );
}


/**
 * Vratit zoznam prispevkov vratane pouzivatelskeho mena autora zoradeny posla casu vytvorenia zostupne.
 * @returns {Promise<*>}
 */
async function findAllPosts(id) {
    return Db.query('SELECT * FROM posts where id_pod = :id ORDER BY created_at ASC', {id: id});
}

export {addLike, addPost, findAllPosts, deletePost, getEventID}