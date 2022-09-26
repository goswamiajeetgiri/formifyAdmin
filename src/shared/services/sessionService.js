import { AsyncStorage } from 'AsyncStorage';
class StorageCall {

    setAsyncStorage = async (name, value) => {
        try {
            AsyncStorage.setItem(name, value);
        }
        catch { }
    }
    getAsyncStorage = async (name) => {

        try {
            const value = await AsyncStorage.getItem(name);
            if (value != null) {
                return value;
            }
        } catch (error) {
            // Error retrieving data

        }
        return -1;

    };
}