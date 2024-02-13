import { Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

type Props = {
  user: Partial<User>
}

function UserActions({ user }: Props) {

  const { data: session } = useSession();

  return (
    <Dropdown label={`مرحبا ${user.displayName}`} inline>
      <Dropdown.Item
        icon={CiSettings}><span className='mx-2'>اعدادات</span></Dropdown.Item>

      {session?.user.role === 'ADMIN' && 
      <Dropdown.Item
        icon={CiSettings}>
        <Link href={'/api/auth/signup'}><span className='mx-2'>اضافة مستخدم جديد</span></Link>
      </Dropdown.Item>}

      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut()}><span className='mx-2'>تسجيل الخروج</span></Dropdown.Item>

    </Dropdown>
  )
}

export default UserActions