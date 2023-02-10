import { ref, shallowRef, watch } from 'vue-demi'
import type { Ref, ShallowRef } from 'vue-demi'
import extend from 'js-cool/lib/extend'
import { inBrowser, isChrome } from './utils'

export interface SpeechOptions {
	preferTouchEvent: boolean
	voiceFilter: ((voice: SpeechSynthesisVoice) => boolean) | null
	lang: 'zh-CN' | string
	pitch: number
	rate: number
	volume: number
}
export type UtterOptions = Partial<
	Pick<
		SpeechSynthesisUtterance,
		| 'lang'
		| 'onboundary'
		| 'onend'
		| 'onerror'
		| 'onmark'
		| 'onpause'
		| 'onresume'
		| 'onstart'
		| 'pitch'
		| 'rate'
		| 'text'
		| 'voice'
		| 'volume'
	>
>
export interface Effect {
	key: symbol
	content: string
	utterOptions: UtterOptions
}

let ready: Ref<boolean>,
	voice: ShallowRef<SpeechSynthesisVoice | undefined>,
	utter: Ref<SpeechSynthesisUtterance | null>,
	speech: SpeechSynthesis,
	effects: Ref<Effect[]>
const defaultOptions: SpeechOptions = {
	preferTouchEvent: false,
	voiceFilter: null,
	lang: 'zh-CN',
	pitch: 1,
	rate: 1,
	volume: 1
}

function useSpeech(options: SpeechOptions) {
	if (!inBrowser) return
	if (typeof window.speechSynthesis === 'undefined') {
		console.error('speechSynthesis is not supported')
		return
	}

	options = extend(true, {}, defaultOptions, options) as unknown as SpeechOptions
	if (!speech) speech = window.speechSynthesis
	if (!effects) effects = ref([])
	if (!utter) utter = ref(null)
	if (!voice) {
		voice = shallowRef()
		// voiceschanged
		const handler = () => {
			voice.value = getVoice()
			speech.removeEventListener('voiceschanged', handler)
		}
		speech.addEventListener('voiceschanged', handler)
	}
	if (!ready) {
		ready = ref(!isChrome)

		// exec
		watch([ready, voice, effects], ([isReady, voiceValue, effectsValue]) => {
			if (isReady && voiceValue && effectsValue.length > 0) {
				for (const { content, utterOptions } of effectsValue) {
					utter.value = new SpeechSynthesisUtterance(content)
					let action: keyof UtterOptions
					for (action in utterOptions) {
						utter.value[action] = utterOptions[action] as never
					}
					utter.value.voice = voiceValue
					utter.value.pitch = options.pitch
					utter.value.rate = options.rate
					utter.value.volume = options.volume
					speech.speak(utter.value)
				}
				effects.value = []
				utter.value = null
			}
		})
	}
	if (!ready.value) {
		const eventName = options.preferTouchEvent ? 'touchend' : 'click'
		// init
		const handler = () => {
			speech.speak(new SpeechSynthesisUtterance(''))
			ready.value = speech.speaking || speech.pending
			window.removeEventListener(eventName, handler)
			window.removeEventListener('keypress', handler)
		}
		window.addEventListener(eventName, handler)
		window.addEventListener('keypress', handler)
	}

	/**
	 * get voice
	 *
	 * @returns result voice: SpeechSynthesisVoice
	 */
	function getVoice(): SpeechSynthesisVoice | undefined {
		if (voice.value) return voice.value

		const list = speech.getVoices().sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) return -1
			else if (nameA === nameB) return 0
			return 1
		})

		if (options.voiceFilter) return list.find(options.voiceFilter)
		return (
			list.find(({ lang, localService }) => localService && lang === options.lang) ||
			list.find(({ lang }) => lang === options.lang)
		)
	}

	/**
	 * get current utter
	 *
	 * @returns result - utter: SpeechSynthesisUtterance
	 */
	function getCurrentUtter(): SpeechSynthesisUtterance | null {
		if (!utter.value) console.warn('no utter right now')
		return utter.value
	}

	/**
	 * speak
	 *
	 * @param content - speak text
	 * @param utterOptions - utter options: UtterOptions
	 * @returns result - effectKey: symbol
	 */
	function speak(content: string, utterOptions: UtterOptions = {}): Effect['key'] {
		const effect = {
			key: Symbol('SpeechKey#effect'),
			content,
			utterOptions
		}
		effects.value = ([] as Effect[]).concat(effects.value, effect)

		return effect.key
	}

	/**
	 * Remove unconsumed speak
	 *
	 * @param effectKey - key of effect
	 * @returns result - cancellation result true=Cancellation success false=Broadcast content not found or broadcast consumed
	 */
	function remove(effectKey: Effect['key']): boolean {
		const _effects = ([] as Effect[]).concat(effects.value)
		const index = _effects.findIndex(({ key }) => key === effectKey)
		if (index > -1) {
			_effects.splice(index, 1)
			effects.value = _effects
			return true
		}
		return false
	}

	/**
	 * Forced cancellation of all broadcasts, and immediate cancellation of those being broadcast
	 */
	function cancel() {
		speech.cancel()
	}

	/**
	 * Suspension of all broadcasts and immediate cancellation of those being broadcast
	 */
	function pause() {
		speech.pause()
	}

	/**
	 * Resume all broadcasts and immediately cancel those being broadcast
	 */
	function resume() {
		speech.resume()
	}

	return {
		ready,
		voice,
		speech,
		speak,
		remove,
		cancel,
		pause,
		resume,
		getVoice,
		getCurrentUtter
	}
}

export { useSpeech, useSpeech as default }
