export default class SoundModel {
    public readonly name: string;
    public readonly count: number;
    public readonly tags: string[];

    constructor(name: string, tag?: string[]) {
        this.name = name;
        this.count = 0;
        this.tags = tag ?? [];
    }
}
  