import { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'tamagui';
import { Input } from '@/components/atoms/inputs/input';
import { IconButton } from '@/components/atoms/buttons/icon-button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Message from '@/components/molecules/messages/message';
import { asyncStorageToken } from '@/utils/asyncStorageToken';
import { SocketContext } from '@/context/socket';
import { API_URL } from '@/utils/api';
import { Text } from '@/components/atoms/typography/text';

export default function MessagesTestScreen() {
    const socket = useContext(SocketContext);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [messages, setMessages] = useState([
        { id: 1, content: "What's up bro", date: '9:02', whoAreYou: 'sender' },
        { id: 2, content: 'Fine', date: '9:05', whoAreYou: 'receiver' },
        { id: 3, content: 'Cool', date: '9:09', whoAreYou: 'sender' },
        { id: 4, content: 'Bye', date: '9:10', whoAreYou: 'receiver' },
    ]);

    const handleSendMessage = () => {
        if (message.trim()) {
            if (editMode && editingId) {
                // Mode modification
                setMessages(
                    messages.map((msg) => (msg.id === editingId ? { ...msg, content: message } : msg))
                );
                setEditMode(false);
                setEditingId(null);
            } else {
                // Nouveau message
                const newMessage = {
                    id: Date.now(), // Utiliser timestamp comme ID unique
                    content: message,
                    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    whoAreYou: 'sender',
                };
                setMessages([...messages, newMessage]);
            }
            setMessage('');
        }
    };

    const handleModify = (id: any, content: string) => {
        setEditMode(true);
        setEditingId(id);
        setMessage(content);
    };

    const handleDelete = (id: any) => {
        setMessages(messages.filter((msg) => msg.id !== id));
    };

    useEffect(() => {
        console.log('d');
        if (!socket || !socket.connected) return;

        const setupSubscription = async () => {
            const token =
                'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3NDQyMDkzNDksImV4cCI6MTc0NDI5NTc0OX0.Pp24gKgr4390o0yHfjkia5q2BtskKTdJ5ZGbi09UXq5N0_0jJWtSu9ccT9Gld1SJ';

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            socket.subscribe(
                `/topic/room.1`,
                (message) => {
                    console.log('📥 Reçu du WS :', message);
                    const parsed = JSON.parse(message.body);
                    setMessages((prev) => [...prev, parsed]);
                },
                headers
            );
            console.log('✅ Subscription done');
        };

        setupSubscription();
    }, [socket]);

    return (
        <View flex={1} backgroundColor="$background" justifyContent="space-between">
            <ScrollView flex={1} width="100%" padding="$4">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        id={msg.id}
                        content={msg.content}
                        date={msg.date}
                        whoAreYou={msg.whoAreYou}
                        onModify={handleModify}
                        onDelete={handleDelete}
                    />
                ))}
            </ScrollView>

            <Text>{API_URL}</Text>

            <View
                width="100%"
                flexDirection="row"
                alignItems="center"
                padding="$4"
                borderTopWidth={1}
                borderTopColor="$border"
            >
                <Input
                    placeholder={editMode ? 'Modifier votre message...' : 'Tapez votre message...'}
                    variant="outline"
                    size="sm"
                    width={editMode ? '70%' : '85%'}
                    flex={1}
                    value={message}
                    onChangeText={setMessage}
                />
                <IconButton variant="bottomless" onPress={handleSendMessage} marginLeft="$2">
                    <FontAwesome
                        name={editMode ? 'check' : 'paper-plane'}
                        size={20}
                        color={editMode ? 'green' : 'black'}
                    />
                </IconButton>
                {editMode && (
                    <IconButton
                        variant="bottomless"
                        onPress={() => {
                            setEditMode(false);
                            setEditingId(null);
                            setMessage('');
                        }}
                        marginLeft="$2"
                    >
                        <FontAwesome name="times" size={20} color="red" />
                    </IconButton>
                )}
            </View>
        </View>
    );
}
