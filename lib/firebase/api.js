import {get, ref} from 'firebase/database'
import {db} from './firebaseInit'

export async function getToDoItems() {
	const dbRef = ref(db)
	const snapshot = await get(dbRef, 'constructiondata1')
	return await snapshot.val()
}
