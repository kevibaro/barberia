import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "../supabaseClient"
import Supabase from './Supabase';



function Home() {
    const [session, setSession] = useState(null)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                setUserName(session.user.user_metadata.name)

            }
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
                setUserName(session.user.user_metadata.name)

            }
        })
        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
    };

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} />)
    }
    else {
        return (

            <div>
                <Supabase userName={userName} />
                <h2 className='welcome'>Welcome,{session?.user?.email}</h2>
                <button onClick={signOut}>Cerrar</button>
                
            </div>)

    }
}

export default Home