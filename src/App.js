import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./ProgressContext"; // Context for tracking user progress
import "./reset.css";
import "./App.scss";
import { adminInfo } from "./JSONs/adminInfo"; // Contains admin specific information
import "@aws-amplify/ui-react/styles.css";
import { Heading, Text, Image, View, Authenticator, useTheme, ThemeProvider } from "@aws-amplify/ui-react";
import Home from "./screens/Home";
import HomeAdmin from "./screens/HomeAdmin";
import Video from "./screens/Video";
import Quiz from "./screens/Quiz";
import RecapPage from "./screens/RecapPage";
import FAQPage from "./screens/FAQPage";
import ProfilePage from "./screens/ProfilePage";
import RecapContentPage from "./screens/RecapContentPage";
import Result from "./screens/Result";
import ContactPage from "./screens/ContactPage";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";
import { ConfigProvider } from "antd";

Amplify.configure(config); // Configure AWS Amplify

// Custom sign-in and confirmation form configurations
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

// Define custom components for the Amplify Authenticator UI
const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.xxxl} backgroundColor={tokens.colors.brand.primary[20]}>
        <Image alt="CCHS Logo" src="/cclogo.png" />
      </View>
    );
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}  level={3} color={tokens.colors.red[80]}>
          City High Orientation
        </Heading>
      );
    },
    VerifyUser: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
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
          <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  },
};

// Define a custom theme for the application
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
      <ConfigProvider theme={{ token: { colorPrimary: "#9e2a2b" } }}>
        <ThemeProvider theme={earthyTheme}>
          <Authenticator style={{ backgroundColor: "blue" }} formFields={formFields} components={components} hideSignUp={true}>
            {({ user }) => (
              <main>
                <ProgressProvider>
                  <Routes>
                    {/* Conditional rendering of routes based on whether the user is an admin */}
                    {user?.username === adminInfo.adminUsername ? (
                      <>
                        <Route path="/" element={<HomeAdmin user={user} />} />
                        <Route path="/admin" element={<HomeAdmin user={user} />} />
                      </>
                    ) : (
                        <Route path="/" element={<Home user={user} />} />
                    )}
                    <Route path="/home" element={<Home user={user} />} />
                    <Route path="/video/*" element={<Video />} />
                    <Route path="/quiz/*" element={<Quiz user={user} />} />
                    <Route path="/recap" element={<RecapPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route
                          path="/recapcontent/:moduleName"
                          element={<RecapContentPage />}
                        />
                        <Route path="/result/*" element={<Result />} />
                      </Routes>
                    </ProgressProvider>
                  </main>
                  )}
          </Authenticator>
        </ThemeProvider>
      </ConfigProvider>
    </Router>
  );
}
