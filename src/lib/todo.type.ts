import type { ObjectId } from 'mongodb' 

export type Todo = {
  _id ?: string,
  task: string,
  created_on:Date,
  priority:number,
  done:Boolean
}
