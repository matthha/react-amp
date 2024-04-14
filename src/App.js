import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./ProgressContext"; // Adjust the path if necessary
import "./reset.css";
import "./App.scss";
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
  useTheme,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import Home from "./screens/Home";
import HomeAdmin from "./screens/HomeAdmin";
import Video from "./screens/Video";
import Quiz from "./screens/Quiz";
import RecapPage from "./screens/RecapPage";
import FAQPage from "./screens/FAQPage";
import ProfilePage from "./screens/ProfilePage";
import TestYaml from "./screens/TestYaml";
import RecapContentPage from "./screens/RecapContentPage";
import Result from "./screens/Result";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@aws-amplify/ui-react";
import ProfileAdmin from "./screens/ProfileAdmin";

import { ConfigProvider } from "antd";

Amplify.configure(config);

// const client = generateClient();
const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
    },
  },
  confirmVerifyUser: {
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View
        textAlign="center"
        padding={tokens.space.xxxl}
        backgroundColor={tokens.colors.brand.primary[20]}
      >
        <Image alt="CCHS Logo" src="./cclogo.png" />
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
        return (<Text>Footer Information</Text>);
      },
    },
  },
};

const earthyTheme = {
  name: "earthTheme",
  tokens: {
    colors: {
      brand: {
        primary: {
          20: { value: "{colors.red.80}" },
          80: { value: "{colors.red.80}" },
          red: "#FF0000",
        },
      },
    },
  },
};


export default function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#9e2a2b",
          },
        }}
      >
        <ThemeProvider theme={earthyTheme}>      
          <Authenticator
            style={{ backgroundColor: "blue" }}
            formFields={formFields}
            components={components}
            hideSignUp={true}
          >

            {({ signOut, user }) => {
              // * This is the current admin path and their username
              if (user?.username === "matthha") {
                return (
                  <main>
                    <Routes>
                      <Route path="/" element={<HomeAdmin user={user} />} />
                      <Route path="/home" element={<HomeAdmin user={user} />} />
                      <Route
                        path="/profile"
                        element={<ProfileAdmin signOut={signOut} />}
                      />
                    </Routes>
                  </main>
                );
              } else {
                return (
                  <main>
                    <ProgressProvider>
                      <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        <Route path="/home" element={<Home user={user} />} />
                        <Route path="/video/*" element={<Video />} />
                        <Route path="/quiz/*" element={<Quiz user={user} />} />
                        <Route path="/recap" element={<RecapPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route
                          path="/profile"
                          element={<ProfilePage signOut={signOut} />}
                        />
                        <Route path="/yaml/*" element={<TestYaml />} />
                        {/* <Route path="/recapcontent" element={<RecapContentPage/>} /> */}
                        <Route
                          path="/recapcontent/:moduleName"
                          element={<RecapContentPage />}
                        />
                        <Route path="/result/*" element={<Result />} />
                      </Routes>
                    </ProgressProvider>
                  </main>
                );
              }
            }}
          </Authenticator>
        </ThemeProvider>
      </ConfigProvider>
    </Router>
  );
}
