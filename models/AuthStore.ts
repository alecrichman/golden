import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const AuthStoreModel = types
    .model("AuthStore")
    .props({
        accessToken: types.maybe(types.string),
        refreshToken: types.maybe(types.string),
        email: types.maybe(types.string),
        id: types.maybe(types.string),
    })
    .views((store) => ({
        get isAuthenticated() {
            return !!store.accessToken;
        }
    }))
    .actions((store) => ({
        setAccessToken(value?: string) {
            store.accessToken = value
        },
        setRefreshToken(value?: string) {
            store.refreshToken = value
        },
        setEmail(value: string) {
            store.email = value.replace(/ /g, "")
        },
        setId(value?: string) {
            store.id = value
        },
        logOut() {
            store.accessToken = undefined;
            store.refreshToken = undefined;
            store.email = undefined;
            store.id = undefined;
        }
    }));

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshot extends SnapshotOut<typeof AuthStoreModel> {}