import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [inputParticipant, setInputParticipant] = useState("");
  
  const handleParticipantAdd = () => {
    if (!inputParticipant) return;

    if (participants.includes(inputParticipant)) {
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.")
    }  
    
    setParticipants(prevState => [...prevState, inputParticipant]);
    setInputParticipant('');
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Remover ${name}?`, [
      { text: 'Sim', onPress: () => {
        const removedParticipants = participants.filter(part => part !== name);
        setParticipants(removedParticipants);
        Alert.alert("Deletado!");
       } 
      },
      {text: 'Não', style: 'cancel'}
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          value={inputParticipant}
          onChangeText={setInputParticipant}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={handleParticipantRemove}
          />
        )}
      />
      
    </View>
  );
}


