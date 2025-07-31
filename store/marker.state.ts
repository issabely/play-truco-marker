import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PlayerState {
  id: number;
  name: string;
  trophies: number;
  points: number;
}

interface MarkerState {
  Players: PlayerState[];
  getPlayer: (id: number) => PlayerState | undefined;
  updatePlayerPoints: (id: number, points: number) => void;
  resetTrophies: () => void;
  resetPoints: () => void;
  setPlayerName: (id: number, name: string) => void; // ✅ Adicionada aqui
}

const useMarkerStore = create<MarkerState>()(
  persist(
    (set, get) => ({
      Players: [
        {
          id: 0,
          name: "Nós",
          trophies: 0,
          points: 0,
        },
        {
          id: 1,
          name: "Eles",
          trophies: 0,
          points: 0,
        },
      ],

      getPlayer: (id: number) => {
        const players = get().Players;
        return players.find((player) => player.id === id);
      },

      updatePlayerPoints: (id: number, points: number) => {
        // Atualiza pontos
        set((state) => ({
          Players: state.Players.map((player) =>
            player.id === id
              ? {
                  ...player,
                  points: Math.max(0, Math.min(12, player.points + points)),
                }
              : player
          ),
        }));

        // Verifica vencedor
        const winner = get().Players.find((player) => player.points === 12);

        // Atualiza troféu do vencedor
        set((state) => ({
          Players: state.Players.map((player) =>
            player.id === winner?.id
              ? { ...player, trophies: player.trophies + 1 }
              : player
          ),
        }));

        // Reseta pontos se houver vencedor
        if (winner) {
          get().resetPoints();
        }
      },

      resetTrophies: () => {
        set((state) => ({
          Players: state.Players.map((player) => ({
            ...player,
            trophies: 0,
          })),
        }));
      },

      resetPoints: () => {
        set((state) => ({
          Players: state.Players.map((player) => ({
            ...player,
            points: 0,
          })),
        }));
      },

      // ✅ Função para alterar nome do jogador
      setPlayerName: (id: number, name: string) => {
        set((state) => ({
          Players: state.Players.map((player) =>
            player.id === id ? { ...player, name } : player
          ),
        }));
      },
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useMarkerStore;
