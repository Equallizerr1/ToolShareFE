import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Avatar,
  Card,
  Text,
  Chip,
  TouchableRipple,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import GlobalStateContext from "../Contexts/GlobalStateContext";
import { useRoute } from "@react-navigation/native";
import { GreenTheme } from "../Themes/GreenTheme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

const ToolDetailsScreen: React.FC = () => {
  const { api } = useContext(GlobalStateContext);
  const [toolDetails, setToolDetails] = useState<object>();
  const [ownerDetails, setOwnerDetails] = useState<object>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);
  const route = useRoute();

  function getToolByToolId(listing_id: number) {
    return api.get(`/listing/${listing_id}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const currentTool = data[0];
      return currentTool;
    });
  }

  function getOwnerDetails(profile_id: number) {
    return api.get(`/profile/${profile_id}`).then((apiResponse) => {
      const {
        data: { data },
      } = apiResponse;
      const ownerDetails = data[0];
      return ownerDetails;
    });
  }

  useEffect(() => {
    (async () => {
      const { listing_id } = route.params;
      const toolDetails = await getToolByToolId(listing_id);
      setToolDetails(toolDetails);
      setIsLoading(false);
      const profile_id: number = toolDetails?.owner_id;
      const ownerDetails = await getOwnerDetails(profile_id);
      setOwnerDetails(ownerDetails);
    })();
  }, []);

  const image_url: string = toolDetails?.photo_url;
  const toolName: string = toolDetails?.tool;
  const description: string = toolDetails?.description;
  const category: string = toolDetails?.category;
  const subcategory: string = toolDetails?.subcategory;
  const depositRequired: boolean = toolDetails?.deposit_required;
  const depositAmount: number = toolDetails?.deposit_amount;
  const profilePicture_url: string = ownerDetails?.picture_url;
  const ownerName: string = ownerDetails?.display_name;

  return (
    <ScrollView>
      <View style={styles.toolDetails}>
        {isLoading ? (
          <Text variant="bodyMedium">Loading tool...</Text>
        ) : (
          <>
            <Text variant="headlineMedium">{toolName}</Text>
            <Image
              source={{
                uri: image_url,
              }}
              style={styles.image}
            />
            <View style={styles.category}>
              <Chip icon="toolbox" style={styles.chip}>
                {category}
              </Chip>
              <Chip icon="toolbox" style={styles.chip}>
                {subcategory}
              </Chip>
            </View>
            <View style={styles.about}>
              <Icon name="info-outline" size={20} />
              <TouchableRipple
                onPress={() => {
                  setDescriptionOpen(!descriptionOpen);
                }}
              >
                <Text variant="titleMedium" style={styles.aboutTitle}>
                  Learn more about this tool
                </Text>
              </TouchableRipple>
            </View>
            {descriptionOpen ? (
              <Text variant="bodyMedium" style={styles.description}>
                {description}
              </Text>
            ) : null}
            <View>
              <View style={styles.deposit}>
                {depositRequired ? (
                  <>
                    <Text style={styles.depositRequired}>Deposit required</Text>
                    <Icon name="check" size={30} color="green" />
                  </>
                ) : (
                  <>
                    <Text style={styles.depositRequired}>
                      No deposit required
                    </Text>
                    <Icon name="cancel" size={30} color="green" />
                  </>
                )}
              </View>
              {depositRequired ? (
                <Text>Deposit amount: £{depositAmount}</Text>
              ) : null}
            </View>
            <Card style={styles.ownerCard}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text variant="bodyLarge">Lender: </Text>
                  <Text variant="bodyLarge">{ownerName}</Text>
                </View>
                <Avatar.Image
                  source={{
                    uri: profilePicture_url,
                  }}
                  style={styles.ownerAvatar}
                />
              </Card.Content>
            </Card>
            <View style={styles.buttons}>
              <Button
                style={styles.location}
                icon={() => (
                  <Icon name="location-pin" size={30} color="green" />
                )}
              >
                {" "}
                Get location
              </Button>
              <Button
                icon="chat"
                mode="contained"
                style={{ marginVertical: 20 }}
              >
                Start Chat
              </Button>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toolDetails: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    height: 225,
    borderRadius: 20,
  },
  category: {
    flexDirection: "row",
    marginBottom: 20,
  },
  chip: {
    marginRight: 10,
    backgroundColor: GreenTheme.colors.surface,
  },
  about: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  aboutTitle: {
    marginLeft: 5,
  },
  description: {
    width: "95%",
    textAlign: "center",
  },
  deposit: {
    flexDirection: "row",
    alignItems: "center",
  },
  depositRequired: {
    marginRight: 8,
  },
  location: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: GreenTheme.colors.primary,
    borderRadius: 15,
  },
  ownerCard: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    backgroundColor: GreenTheme.colors.surface,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flexDirection: "row",
    color: GreenTheme.colors.darkText,
  },
  ownerAvatar: {
    marginLeft: 30,
  },
  chatIcon: {
    marginRight: 30,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});

export default ToolDetailsScreen;
