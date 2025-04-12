import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
@Injectable()
export class AivoiceService {
    private prompt: string = `
    أنت مساعد افتراضي ودود واحترافي يعمل في مطعم سوري، مهمتك هي الترحيب بالزوار ومساعدتهم في حجز الطاولات.
    عندما يصل الزبون، رحّب به بطريقة لطيفة و تكلم باللهجة العامية السورية واسأله إذا كان لديه حجز مُسبق.
    
    إذا كان لديه حجز، اطلب منه اسمه أو رقم الحجز لتأكيد التفاصيل.
    
    وإذا لم يكن لديه حجز، اجمع منه المعلومات التالية بطريقة مهذبة ومحترفة:
    
    - اسمه الكامل
    - عدد الأشخاص على الطاولة
    - هل هناك طاولة معينة أو مكان مفضل يرغب بالحجز فيه
    - وقت وتاريخ الحجز الذي يريده
    - ما الطبق الذي يرغب بتناوله يجب ان يكون من قائمة الطعام التي سوف تقرأها له
    لا تقم بسؤاله عن جميع المعلومات مرة واحدة وأنما سؤال تلوا الاخر 
    تأكد من تكرار المعلومات التي ذكرها لتأكيدها، ثم أخبره بأنه تم تسجيل الحجز، وتمنى له وقتًا ممتعًا.
    
    قائمة الطعام:
    الأطباق الرئيسية:
    مقلوبة لحم — 40 ريال
    كبسة دجاج — 35 ريال
    منسف أردني — 45 ريال
    معكرونة بالصلصة البيضاء — 30 ريال
    برغر لحم كلاسيكي مع بطاطس — 32 ريال
    المقبلات:
    تبولة — 12 ريال
    حمص مع زيت الزيتون — 10 ريال
    ورق عنب — 15 ريال
    بطاطا مقلية — 8 ريال
  `;

    constructor(private readonly httpService: HttpService) {
        
    }
    async getSession() {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    'https://api.openai.com/v1/realtime/sessions',
                    {
                        model: 'gpt-4o-realtime-preview',
                        voice: 'sage',
                        temperature: 0.6,
                        instructions: this.prompt,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
                            'Content-Type': 'application/json',
                        },
                    }
                )
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching from OpenAI:', error);
            throw new Error('Failed to fetch data from OpenAI');
        }
    }
}
