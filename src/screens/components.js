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
const customcomponents = {
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

  export default customcomponents;