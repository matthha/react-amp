import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Image,
  View,
  withAuthenticator,
  Authenticator,
  useTheme
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import Home from "./screens/Home";
import config from './aws-exports'
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@aws-amplify/ui-react"

Amplify.configure(config)

const client = generateClient();
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  confirmVerifyUser: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.xxxl} backgroundColor={tokens.colors.brand.primary[20]} >
        <Image
          alt="CCHS Logo"
          src="./cclogo.png"
        />
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
          color={tokens.colors.red[80]}
        >
          Orientation Dashboard
        </Heading>
      
      );
    },


  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
}
}


const earthyTheme = {
  name: "earthTheme",
  tokens: {
    colors: {
      brand: {
        primary: {
          20: { value: "{colors.red.80}" },
          80: { value: "{colors.red.80}" },
          red: '#FF0000', 
         
        },
       
      },
    },
  },
}



export default function App() {
  return (
    <ThemeProvider theme={earthyTheme}>
    <Authenticator style={{ backgroundColor: 'blue' }}
      formFields={formFields}
      components={components}
      hideSignUp={true}
    
    >
      {({ signOut, user }) => {
        return (
          <main>
            <View >
              <Home/>
            </View>
            <button style={{backgroundColor:'red'}} onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
    </ThemeProvider>
  );
}
