import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, Sparkles, Sprout, Send, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

export default function KisanVoiceAssistantModal({ isOpen, onClose, language = 'hi' }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: language === 'pa' ? 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਅਨਾਜਸੇਤੂ ਏਆਈ ਆਵਾਜ਼ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਫਸਲ ਦੇ ਰੇਟ ਜਾਂ ਹੱਬ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ।' :
            language === 'hr' ? 'राम-राम किसान भाई! मैं ताऊ एआई आवाज़ सहायक सूं। फसल के रेट या गाम हब की बात पूछ ले!' :
            language === 'bho' ? 'प्रणाम किसान भाई! हम अनाजसेतु एआई आवाज़ सहायक बानी। फसल के भाव चाहे हब के बारे में कुछ भी पूछीं।' :
            language === 'mr' ? 'नमस्कार शेतकरी मित्रांनो! मी अनाजसेतू एआई आवाज सहाय्यक आहे. आपण पिकांचे दर किंवा केंद्राबद्दल काहीही विचारू शकता.' :
            'नमस्ते किसान भाई! मैं अनाजसेतु एआई आवाज़ सहायक हूँ। आप फसल के सही दाम, मंडी भाव या एफपीओ हब के बारे में बोलकर पूछ सकते हैं।',
      time: 'Just now'
    }
  ]);

  const presetQueries = {
    hi: [
      "शरबाती गेहूं का सही दाम क्या मिलेगा?",
      "नासिक मंडी में प्याज का भाव बताओ",
      "मेरे पास 50 क्विंटल टमाटर है, पिकअप कैसे बुक करें?"
    ],
    hr: [
      "ताऊ, गेंहू का रेट बता दे!",
      "गाम हब ते गाड़ी कदे आवेगी?",
      "टमाटर का सही भाव कित मिलैगा?"
    ],
    pa: [
      "ਕਣਕ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਰੇਟ ਕਿੱਥੇ ਮਿਲੇਗਾ?",
      "ਸਾਡੇ ਪਿੰਡ ਦੇ ਐਫਪੀਓ ਹੱਬ ਤੋਂ ਗੱਡੀ ਕਦੋਂ ਚੱਲੇਗੀ?",
      "ਬਾਸਮਤੀ ਚੌਲਾਂ ਦਾ ਤਾਜ਼ਾ ਮੰਡੀ ਭਾਅ ਦੱਸੋ"
    ],
    mr: [
      "कांद्याचा थेट बाजार भाव काय आहे?",
      "नाशिक केंद्रात ५० क्विंटल गहू कसा विकू?",
      "टोमॅटोची ग्रेडिंग कशी करावी?"
    ],
    bho: [
      "टमाटर के सही दाम का बा?",
      "गाँव के हब पर गाड़ि कब आई?",
      "गेहूं के पक्का भाव बताव"
    ],
    en: [
      "What is the fair price for Sharbati Wheat?",
      "How to schedule FPO village hub pickup?",
      "Tell me today's Agmarknet mandi benchmarks"
    ]
  };

  const activePresets = presetQueries[language] || presetQueries.hi;

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'pa' ? 'pa-IN' : language === 'mr' ? 'mr-IN' : 'hi-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAsk = (promptText) => {
    const textToSend = promptText || queryText;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend, time: 'Now' };
    setChatHistory(prev => [...prev, userMsg]);
    setQueryText('');
    setIsListening(false);

    // AI Response Engine Simulation
    setTimeout(() => {
      let botReply = "अनाजसेतु एआई विश्लेषण के अनुसार, आपकी फसल ग्रेड ए की है। आपको मंडी से ₹7.50/किग्रा अधिक दाम मिलेगा और गांव हब से पिकअप कल सुबह 08:00 बजे तैयार है।";
      
      if (language === 'hr') {
        botReply = "राम-राम भाई! थारी गेंहू फसल का पक्का रेट ₹38.50/किग्रा तय होया सै। मंडी ते ₹7.50 फाल्तू मिलेगा अर गाम हब ते गाड़ी काल सुबे 8 बजे आवेगी!";
      } else if (language === 'pa') {
        botReply = "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! ਤੁਹਾਡੀ ਫਸਲ ਦਾ ਰੇਟ ₹38.50/ਕਿਲੋ ਤੈਅ ਹੋਇਆ ਹੈ। ਮੰਡੀ ਨਾਲੋਂ ₹7.50 ਵਧੇਰੇ ਮਿਲੇਗਾ ਅਤੇ ਪਿੰਡ ਦੇ ਹੱਬ ਤੋਂ ਗੱਡੀ ਕੱਲ੍ਹ ਸਵੇਰੇ 8 ਵਜੇ ਮਿਲੇਗੀ।";
      } else if (language === 'mr') {
        botReply = "नमस्कार! आपल्या पिकाचा थेट दर ₹३८.५०/किलो निश्चित झाला आहे. बाजार समितीपेक्षा ₹७.५० जास्त मिळतील व उद्या सकाळी ८ वाजता ट्रान्स्पोर्ट मिळेल.";
      } else if (language === 'bho') {
        botReply = "प्रणाम भाई! राउर फसल के सही दाम ₹38.50/किग्रा तय भईल बा। मंडी से ₹7.50 जादा मिली अउरी गाँव हब से गाड़ि काल्ह सबेरे 8 बजे आई।";
      }

      setChatHistory(prev => [...prev, { sender: 'bot', text: botReply, time: 'Now' }]);
      speakText(botReply);
    }, 1000);
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        const sampleQuery = activePresets[0];
        setQueryText(sampleQuery);
        handleAsk(sampleQuery);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">किसान आवाज़ सहायक (AI Voice Assistant)</h3>
                <span className="badge-amber text-[10px]">Multilingual</span>
              </div>
              <p className="text-xs text-slate-500">Hands-free Voice Intelligence for Farmers & FPOs</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 font-bold text-lg">✕</button>
        </div>

        {/* Voice Visualizer Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 text-center space-y-4 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Animated Wave visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-12">
            {[40, 70, 30, 90, 60, 100, 50, 80, 40, 60].map((height, idx) => (
              <div
                key={idx}
                className={`w-1.5 bg-gradient-to-t from-emerald-500 to-amber-400 rounded-full transition-all duration-300 ${
                  isSpeaking || isListening ? 'animate-pulse' : 'opacity-40'
                }`}
                style={{ height: isSpeaking || isListening ? `${height}%` : '20%' }}
              ></div>
            ))}
          </div>

          <div className="space-y-1">
            <span className="text-xs text-emerald-400 font-bold block">
              {isListening ? "🎤 Listening to your voice..." : isSpeaking ? "🔊 AI Speaking Response..." : "Click Mic or tap a preset question below"}
            </span>
            <p className="text-slate-300 text-xs italic">
              {language === 'hr' ? 'ताऊ, बोल के पूछ ले! फसल का सही भाव अर गाड़ी पिकअप सुण।' :
               language === 'pa' ? 'ਬੋਲ ਕੇ ਪੁੱਛੋ! ਫਸਲ ਦੇ ਸਹੀ ਭਾਅ ਅਤੇ ਟਰੱਕ ਪਿਕਅੱਪ ਦੀ ਜਾਣਕਾਰੀ ਲਓ।' :
               language === 'bho' ? 'बोल के पूछीं! फसल के सही दाम अउरी गाड़ी पिकअप के जानकारी पाईं।' :
               'बोलिए और सुनिए! अपनी फसल का सही दाम और एफपीओ पिकअप का समय जानें।'}
            </p>
          </div>

          {/* Large Interactive Mic Button */}
          <button
            onClick={toggleMic}
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 animate-ping'
                : 'bg-gradient-to-tr from-emerald-500 to-amber-500 text-white shadow-xl hover:scale-105'
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        {/* Preset Voice Questions */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">Tap to Speak Sample Query ({language.toUpperCase()}):</span>
          <div className="flex flex-wrap gap-2">
            {activePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(preset)}
                className="text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-1.5 px-3 rounded-xl text-left flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{preset}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-h-52 overflow-y-auto space-y-3">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-3 rounded-2xl max-w-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
              }`}>
                <p className="leading-relaxed font-medium">{msg.text}</p>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="mt-2 text-[10px] text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Volume2 className="w-3 h-3" /> Listen Audio Again
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type or speak agricultural question..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            onClick={() => handleAsk()}
            className="btn-primary py-2.5 px-4 text-xs font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
