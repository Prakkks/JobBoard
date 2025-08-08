import { createContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface MyContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showUserTitle : boolean;
  setShowUserTitle: React.Dispatch<React.SetStateAction<boolean>>;

}

interface ChildrenProps {
  children: React.ReactNode;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider = ({ children }: ChildrenProps) => {
  const email = (localStorage.getItem('email')) || '';  
  const name = (localStorage.getItem('name')) || '';
  const role = (localStorage.getItem('role')) || '';
  let state = false;

  const [user, setUser] = useState<User | null>({'email' : email , 'name':name , 'role': role}); 
  if (localStorage.getItem('token')!= null)
  {
   state = true; 
  }
  
  const [showUserTitle , setShowUserTitle] = useState (state);

  return (
    <MyContext.Provider value={{ user, setUser , showUserTitle , setShowUserTitle }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
