export interface Message {
  _id: string;
  name: string;
  body: string;
  role: MessageRole;


}

export type MessageRole = 'volunteer' | 'client';



