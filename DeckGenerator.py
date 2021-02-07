import pandas as pd

results = []
twt = 23
outputs = []
operation = ['+','-','*','/']
def combinaiton23(num, ret, oper, outputs):
    if len(ret) == 4:
        if num == 0:
            outputs.append([ret,num])
            return
        else:
            outputs.append([ret,num])
            return 
    else:
        for x in range(1,12):
            for op in oper:
                if op == '+':
                    temp = ret.copy()
                    temp.append([x,'+'])
                    combinaiton23(num - x, temp, oper, outputs)
                elif op == '-':
                    temp = ret.copy()
                    temp.append([x,'-'])
                    combinaiton23(num + x, temp, oper, outputs)
                elif op == '*':
                    temp = ret.copy()
                    temp.append([x,'*'])
                    combinaiton23(num / x, temp, oper, outputs)
                else:
                    temp = ret.copy()
                    temp.append([x,'/'])
                    combinaiton23(num * x, temp, oper, outputs)

# with open('results.txt', 'w') as file:
combinaiton23(twt, results, operation, outputs)
df = pd.DataFrame(outputs)
print(df.head(), df.columns)
correctdf = df.loc[df[df.columns[1]] == 0].reset_index().drop(columns = ['index',df.columns[1]])
correctdf = correctdf.rename(columns ={correctdf.columns[0]:'Answers'})
lastdf = pd.DataFrame(columns = ['Num1','Oper1',
                    'Num2','Oper2','Num3','Oper3','Num4','Oper4'])
for ans in correctdf['Answers']:
    lastdf = lastdf.append({'Num1' : ans[0][0],'Oper1' : ans[0][1],
                'Num2' : ans[1][0],'Oper2' : ans[1][1],
                'Num3' : ans[2][0],'Oper3' : ans[2][1],
                'Num4' : ans[3][0],'Oper4' : ans[3][1]},ignore_index=True)
lastdf.to_csv('results.csv', index = False)