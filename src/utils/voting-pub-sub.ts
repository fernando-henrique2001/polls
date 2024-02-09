type Message = { pollOptionId: string; votes: number };
type Subscriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }
    const index = this.channels[pollId].push(subscriber);
    return () => this.unsubscribe(pollId, index - 1);
  }

  unsubscribe(pollId: string, index: number) {
    this.channels[pollId].splice(index, 1);
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }
    this.channels[pollId].forEach((subscriber) => subscriber(message));
  }
}

export const voting = new VotingPubSub();
