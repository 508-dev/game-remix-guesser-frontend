import { defineComponent, h } from 'vue';
import player from 'youtube-player';

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

type YouTubePlayer = ReturnType<typeof player>;

type PlayerEvent = {
  target: any;
  data?: number | null;
};

type PlayerProperties = {
  videoId: string;
  startSeconds?: number;
  endSeconds?: number;
};

export default defineComponent({
  name: 'Youtube',
  props: {
    videoId: String,
    playerVars: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: 640
    },
    resize: {
      type: Boolean,
      default: false
    },
    resizeDelay: {
      type: Number,
      default: 100
    },
    nocookie: {
      type: Boolean,
      default: false
    },
    fitParent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      player: null as YouTubePlayer | null,
      events: {
        [UNSTARTED]: 'unstarted',
        [PLAYING]: 'playing',
        [PAUSED]: 'paused',
        [ENDED]: 'ended',
        [BUFFERING]: 'buffering',
        [CUED]: 'cued'
      } as Record<number, string>,
      resizeTimeout: null as ReturnType<typeof setTimeout> | null
    };
  },
  computed: {
    aspectRatio() {
      return Number(this.width) / Number(this.height);
    }
  },
  methods: {
    playerReady(e: PlayerEvent) {
      this.$emit('ready', e.target);
    },
    playerStateChange(e: PlayerEvent) {
      if (e.data !== null && e.data !== undefined && e.data !== UNSTARTED) {
        const eventName = this.events[e.data];
        eventName && this.$emit(eventName as any, e.target); // guard against events not anticipated by the events map. only fire if eventName is defined.
      }
    },
    playerError(e: PlayerEvent) {
      this.$emit('error', e.target);
    },
    updatePlayer(videoId: string) {
      if (!this.player) return;

      if (!videoId) {
        this.player.stopVideo();
        return;
      }

      const params: PlayerProperties = { videoId };

      if (typeof this.playerVars.start === 'number') {
        params.startSeconds = this.playerVars.start;
      }

      if (typeof this.playerVars.end === 'number') {
        params.endSeconds = this.playerVars.end;
      }

      if (this.playerVars.autoplay === 1) {
        this.player.loadVideoById(params);
        return;
      }

      this.player.cueVideoById(params);
    },
    resizeProportionally() {
      if (!this.player) return;

      this.player.getIframe().then((iframe: any) => {
        const width = this.fitParent ? iframe.parentElement.offsetWidth : iframe.offsetWidth;
        const height = width / this.aspectRatio;
        this.player && this.player.setSize(width, height);
      });
    },
    onResize() {
      if (this.resizeTimeout !== null) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resizeProportionally(), this.resizeDelay);
    }
  },
  watch: {
    videoId: 'updatePlayer',
    resize(val) {
      if (val) {
        window.addEventListener('resize', this.onResize);
        this.resizeProportionally();
      } else if (this.player) {
        window.removeEventListener('resize', this.onResize);
        this.player.setSize(Number(this.width), Number(this.height));
      }
    },
    width(val) {
      this.player?.setSize(Number(val), Number(this.height));
    },
    height(val) {
      this.player?.setSize(Number(this.width), Number(val));
    }
  },
  beforeUnmount() {
    if (this.player?.destroy) {
      this.player.destroy();
    }
    this.player = null;

    if (this.resize) {
      window.removeEventListener('resize', this.onResize);
    }
  },
  mounted() {
    (window as any).YTConfig = {
      host: 'https://www.youtube.com/iframe_api'
    };

    const host = this.nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';

    this.player = player(this.$el, {
      host,
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    });

    this.player.on('ready', this.playerReady);
    this.player.on('stateChange', this.playerStateChange);
    this.player.on('error', this.playerError);

    if (this.resize) {
      window.addEventListener('resize', this.onResize);
    }

    if (this.fitParent) {
      this.resizeProportionally();
    }
  },
  expose: ['player'],
  render() {
    return h('div');
  }
});
